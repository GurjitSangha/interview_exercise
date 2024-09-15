"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationData = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const converters_utils_1 = require("../utils/converters.utils");
const conversation_cache_manager_service_1 = require("../cache-manager/conversation-cache-manager.service");
const conversation_model_1 = require("./models/conversation.model");
const lastRead_model_1 = require("./models/lastRead.model");
const message_data_1 = require("../message/message.data");
let ConversationData = class ConversationData {
    constructor(chatConversationModel, lastReadModel, conversationCacheManagerService, messageData) {
        this.chatConversationModel = chatConversationModel;
        this.lastReadModel = lastReadModel;
        this.conversationCacheManagerService = conversationCacheManagerService;
        this.messageData = messageData;
    }
    async addMember(conversationId, addMember) {
        const result = await this.chatConversationModel.findOneAndUpdate({ _id: conversationId }, { $addToSet: { memberIds: addMember.userId } }, { new: true });
        if (!result)
            throw new Error('Could not add member to conversation');
        const conversation = (0, conversation_model_1.chatConversationToObject)(result);
        this.conversationCacheManagerService.set(conversation, conversationId);
        return conversation;
    }
    async removeMember(conversationId, memberId) {
        const result = await this.chatConversationModel.findOneAndUpdate({ _id: conversationId }, { $pull: { memberIds: memberId } }, { new: true });
        if (!result)
            throw new Error('Could not remove member from conversation');
        const conversation = (0, conversation_model_1.chatConversationToObject)(result);
        this.conversationCacheManagerService.set(conversation, conversationId);
        return conversation;
    }
    async blockMember(conversationIds, memberId) {
        await this.chatConversationModel.updateMany({ _id: { $in: conversationIds } }, { $addToSet: { blockedMemberIds: memberId } }, { new: true });
        for (const conversationId of conversationIds) {
            this.conversationCacheManagerService.del(conversationId);
        }
    }
    async unblockMember(conversationIds, memberId) {
        await this.chatConversationModel.updateMany({ _id: { $in: conversationIds } }, { $pull: { blockedMemberIds: memberId } }, { new: true });
        for (const conversationId of conversationIds) {
            this.conversationCacheManagerService.del(conversationId);
        }
    }
    async create(data) {
        var _a;
        const chatConversation = new this.chatConversationModel();
        chatConversation.context = data.context;
        chatConversation.product = data.product;
        chatConversation.permissions = (_a = data.permissions) !== null && _a !== void 0 ? _a : [];
        chatConversation.tags = data.tags;
        if (data.memberIds) {
            chatConversation.memberIds = data.memberIds;
        }
        if (data.blockedMemberIds) {
            chatConversation.blockedMemberIds = data.blockedMemberIds;
        }
        const dbResult = await chatConversation.save();
        return (0, conversation_model_1.chatConversationToObject)(dbResult);
    }
    async createChatConversation(data) {
        const chatConversation = new this.chatConversationModel(data);
        const dbResult = await chatConversation.save();
        return (0, conversation_model_1.chatConversationToObject)(dbResult);
    }
    async updateTags(conversationId, tags) {
        const result = await this.chatConversationModel.findOneAndUpdate({ _id: conversationId }, { $set: { tags } }, { new: true });
        if (!result)
            throw new Error('Could not update tags on conversation');
        const conversation = (0, conversation_model_1.chatConversationToObject)(result);
        this.conversationCacheManagerService.set(conversation, conversationId);
        return conversation;
    }
    async getConversation(conversationId) {
        const cachedConversation = await this.conversationCacheManagerService.get(conversationId);
        if (cachedConversation) {
            return cachedConversation;
        }
        const rawConversation = await this.chatConversationModel.findById(conversationId);
        if (!rawConversation) {
            throw new Error('Could not find conversation');
        }
        const conversation = (0, conversation_model_1.chatConversationToObject)(rawConversation);
        this.conversationCacheManagerService.set(conversation, conversationId);
        return conversation;
    }
    async getConversationsForInbox(userId, contexts) {
        // TODO: we want to order by last message sent
        return await this.chatConversationModel.find({
            memberIds: userId,
            context: { $in: contexts }, // this is similar to an array contains any in 2nd array, like an or
        });
    }
    async getConversationByAllMemberIdsAndContext(memberIds, contexts) {
        const dbResult = await this.chatConversationModel.findOne({
            memberIds: { $all: memberIds },
            context: { $in: contexts }, // this is similar to an array contains any in 2nd array, like an or
        });
        if (!dbResult) {
            return null;
        }
        return (0, conversation_model_1.chatConversationToObject)(dbResult);
    }
    async listConversationIds(query) {
        const conversations = await this.chatConversationModel.find(query, {
            _id: 1,
        });
        return conversations.map((conversation) => String(conversation._id));
    }
    async migratePermissions(chatPermissionsDto, product, conversationIds) {
        const query = { product, _id: { $in: conversationIds } };
        await this.chatConversationModel.updateMany(query, { permissions: chatPermissionsDto }, { upsert: false });
        conversationIds.forEach((conversationId) => this.conversationCacheManagerService.del(conversationId));
    }
    async updateConversationWithLastMessage(conversationId, messageId) {
        const chatConversation = await this.chatConversationModel.findById(conversationId);
        if (!chatConversation) {
            throw new Error(`Conversation with id ${conversationId} does not exist`);
        }
        if (!chatConversation.lastMessageId ||
            chatConversation.lastMessageId < messageId) {
            chatConversation.lastMessageId = messageId;
            const dbResult = await chatConversation.save();
            this.conversationCacheManagerService.del(conversationId);
            return (0, conversation_model_1.chatConversationToObject)(dbResult);
        }
        // No change, just return the chat conversation
        return (0, conversation_model_1.chatConversationToObject)(chatConversation);
    }
    async getLastRead(authenticatedUser, conversationId) {
        const dbResult = await this.lastReadModel.findOne({
            conversationId,
            userId: authenticatedUser.userId.toHexString(),
        });
        if (!dbResult) {
            throw new Error('Could not find last read chat message of conversation');
        }
        return (0, lastRead_model_1.lastReadDocumentToObject)(dbResult);
    }
    async recordLastMessageReadByUser({ conversationId, messageId, authenticatedUser, }) {
        const dbResult = await this.lastReadModel.findOneAndUpdate({ conversationId, userId: authenticatedUser.userId.toHexString() }, { messageId }, { new: true, upsert: true });
        return (0, lastRead_model_1.lastReadDocumentToObject)(dbResult);
    }
    /*
     * Returns the array of [{ "id": string, "unreadMessageCount": number}]
     * For now, unreadMessageCount will be either 0 or 1
     * 1 meaning there are unread messages, 0 meaning there aren't
     * In further releases, we can populate the exact number of
     * unread messages for a user in a conversation
     * */
    async getUnreadMessageCounts({ userId, conversationIds, }) {
        const [lastReads, conversations] = await Promise.all([
            this.lastReadModel.find({
                userId,
                conversationId: { $in: conversationIds },
            }),
            this.chatConversationModel
                .find({
                _id: { $in: conversationIds },
                memberIds: userId,
            }, { id: 1, lastMessageId: 1 })
                .sort({ _id: 1 }),
        ]);
        const result = [];
        for (const conv of conversations) {
            const row = { id: conv.id, unreadMessageCount: 0 };
            if (!conv || !conv.lastMessageId) {
                result.push(row);
                continue;
            }
            const lastReadsMatched = lastReads.filter((lr) => lr.conversationId === conv.id);
            if (lastReadsMatched.length > 0) {
                // TODO: Enhance the logic of unread message count to exact number
                const lastRead = lastReadsMatched[0];
                const numberOfUnreadMessages = (0, converters_utils_1.str)(lastRead.messageId) === (0, converters_utils_1.str)(conv.lastMessageId) ? 0 : 1;
                row['unreadMessageCount'] = numberOfUnreadMessages;
            }
            result.push(row);
        }
        return result;
    }
    async getUnreadCountInConversation(userId, conversationId) {
        const lastRead = await this.lastReadModel.findOne({
            userId,
            conversationId,
        });
        const conversation = await this.chatConversationModel.findById(conversationId);
        if (!conversation || !conversation.lastMessageId) {
            // There is no such conversation or it doesnt contain any messages
            return 0;
        }
        if (!lastRead) {
            // There are no records found where user has read this conversation
            return 1;
        }
        return (0, converters_utils_1.str)(conversation.lastMessageId) === (0, converters_utils_1.str)(lastRead.messageId) ? 0 : 1;
    }
    /* Returns the array of [{ "id": string, "lastMessage": ChatMessage}]
     * where the id is conversationId and lastMessage is last message in
     * that conversation
     * */
    async getLastMessages({ userId, conversationIds, }) {
        const conversations = await this.chatConversationModel.find({
            _id: { $in: conversationIds },
            memberIds: userId,
        }, { id: 1, lastMessageId: 1 });
        const lastMessageIds = conversations
            .map((conversation) => conversation.lastMessageId)
            .filter((lastMessageId) => !!lastMessageId);
        const lastMessages = await this.messageData.getMessages(lastMessageIds);
        const lastMessageMap = new Map();
        for (const lastMessage of lastMessages) {
            lastMessageMap.set(String(lastMessage.id), lastMessage);
        }
        const lastMessageOutput = conversations.map((conversation) => {
            const { lastMessageId } = conversation;
            const lastMessage = lastMessageId
                ? lastMessageMap.get(String(lastMessageId))
                : undefined;
            return {
                id: conversation.id,
                lastMessage,
            };
        });
        return lastMessageOutput;
    }
    async pinMessage(conversationId, messageId) {
        const result = await this.chatConversationModel.findOneAndUpdate({ _id: conversationId }, {
            $addToSet: {
                pinnedMessages: messageId,
            },
        }, { new: true });
        if (!result)
            throw new Error('Could not pin message');
        const conversation = (0, conversation_model_1.chatConversationToObject)(result);
        this.conversationCacheManagerService.set(conversation, conversationId);
        return conversation;
    }
    async unpinMessage(conversationId, messageId) {
        const result = await this.chatConversationModel.findOneAndUpdate({ _id: conversationId }, {
            $pull: {
                pinnedMessages: messageId,
            },
        }, { new: true });
        if (!result)
            throw new Error('Could not unpin message');
        const conversation = (0, conversation_model_1.chatConversationToObject)(result);
        this.conversationCacheManagerService.set(conversation, conversationId);
        return conversation;
    }
};
ConversationData = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(conversation_model_1.ChatConversationModel.name)),
    tslib_1.__param(1, (0, mongoose_1.InjectModel)(lastRead_model_1.LastReadModel.name)),
    tslib_1.__metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        conversation_cache_manager_service_1.ConversationCacheManagerService,
        message_data_1.MessageData])
], ConversationData);
exports.ConversationData = ConversationData;
//# sourceMappingURL=conversation.data.js.map
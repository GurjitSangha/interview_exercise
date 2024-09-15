"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageLogic = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const message_data_1 = require("./message.data");
const apollo_server_errors_1 = require("apollo-server-errors");
const permissions_service_1 = require("../permissions/permissions.service");
const permissions_model_1 = require("../permissions/models/permissions.model");
const conversation_channel_socket_1 = require("../conversation/conversation-channel.socket");
const user_service_1 = require("../user/user.service");
const conversation_data_1 = require("../conversation/conversation.data");
const safeguarding_service_1 = require("../safeguarding/safeguarding.service");
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const conversation_logic_1 = require("../conversation/conversation.logic");
const user_blocks_logic_1 = require("../user-blocks/user-blocks.logic");
const ContextSchema_dto_1 = require("../conversation/models/ContextSchema.dto");
const extractUniversityIdsFromContext_1 = require("../conversation/extractUniversityIdsFromContext");
let MessageLogic = class MessageLogic {
    constructor(conversationLogic, messageData, permissions, conversationChannel, userService, conversationData, safeguardingService, userBlocks) {
        this.conversationLogic = conversationLogic;
        this.messageData = messageData;
        this.permissions = permissions;
        this.conversationChannel = conversationChannel;
        this.userService = userService;
        this.conversationData = conversationData;
        this.safeguardingService = safeguardingService;
        this.userBlocks = userBlocks;
    }
    async create(messageDto, authenticatedUser) {
        var _a;
        if (!(await this.permissions.conversationPermissions({
            user: authenticatedUser,
            conversationId: String(messageDto.conversationId),
            action: permissions_model_1.Action.sendMessage,
        }))) {
            throw new apollo_server_errors_1.ForbiddenError(`User is not authorised to send this message`);
        }
        if ((_a = messageDto.richContent) === null || _a === void 0 ? void 0 : _a.poll) {
            if (!(await this.permissions.conversationPermissions({
                user: authenticatedUser,
                conversationId: String(messageDto.conversationId),
                action: permissions_model_1.Action.createPoll,
            }))) {
                throw new apollo_server_errors_1.ForbiddenError(`User is not authorised to create a poll`);
            }
        }
        const { userId, accountRole } = authenticatedUser;
        const conversationId = messageDto.conversationId.toHexString();
        const [message, sender, conversation] = await Promise.all([
            this.messageData.create(messageDto, userId),
            this.userService.getUser(userId.toHexString()),
            this.conversationData.getConversation(conversationId),
        ]);
        // Mark this message as the last message in the conversation
        await this.conversationData.updateConversationWithLastMessage(conversationId, message.id);
        // Register the lastRead for the current user
        // The person who sent this message has obviously read it
        await this.conversationData.recordLastMessageReadByUser({
            conversationId,
            messageId: message.id,
            authenticatedUser,
        });
        const sendMessageEvent = new conversation_channel_socket_1.SendMessageEvent({
            id: message.id,
            text: this.safeguardingService.clean(message.text),
            created: message.created,
            sender: {
                id: sender.id,
                firstName: sender.firstName,
                profilePhoto: sender.profilePhoto,
                accountRole,
            },
            deleted: message.deleted,
            likes: message.likes,
            likesCount: message.likesCount,
            richContent: await this.mapRichContent(messageDto, message),
            resolved: message.resolved,
            isSenderBlocked: false,
        });
        this.conversationChannel.send(sendMessageEvent, conversationId);
        sender.accountRole = accountRole;
        return message;
    }
    async mapRichContent(messageDto, message) {
        var _a, _b, _c, _d, _e;
        let richContent;
        if ((_a = message.richContent) === null || _a === void 0 ? void 0 : _a.reply) {
            const replyMessage = await this.messageData.getMessage(message.richContent.reply.id.toHexString());
            if (replyMessage) {
                const user = await this.userService.getUser(replyMessage.senderId.toHexString());
                richContent = {
                    reply: {
                        id: replyMessage.id,
                        text: this.safeguardingService.clean(replyMessage.text),
                        created: replyMessage.created,
                        deleted: replyMessage.deleted,
                        richContent: (replyMessage === null || replyMessage === void 0 ? void 0 : replyMessage.richContent) || undefined,
                        sender: {
                            id: user.id,
                            firstName: user.firstName,
                            accountRole: user.accountRole,
                            profilePhoto: user.profilePhoto,
                        },
                    },
                };
            }
        }
        if ((_b = messageDto.richContent) === null || _b === void 0 ? void 0 : _b.giphy) {
            const { id, type, width, height, aspectRatio } = messageDto.richContent.giphy;
            const trimmedAspectRatio = Number(aspectRatio.toPrecision(3));
            richContent = {
                ...(richContent || {}),
                giphy: { id, type, width, height, aspectRatio: trimmedAspectRatio },
            };
        }
        if ((_c = messageDto.richContent) === null || _c === void 0 ? void 0 : _c.images) {
            richContent = {
                ...(richContent || {}),
                images: messageDto.richContent.images,
            };
        }
        if ((_d = messageDto.richContent) === null || _d === void 0 ? void 0 : _d.attachments) {
            richContent = {
                ...(richContent || {}),
                attachments: messageDto.richContent.attachments,
            };
        }
        if ((_e = messageDto.richContent) === null || _e === void 0 ? void 0 : _e.poll) {
            richContent = {
                ...(richContent || {}),
                poll: messageDto.richContent.poll,
            };
        }
        return richContent;
    }
    async getMessage(messageId, authenticatedUser) {
        if (!(await this.permissions.messagePermissions({
            user: authenticatedUser,
            messageId: messageId.toHexString(),
            action: permissions_model_1.Action.sendMessage,
        }))) {
            console.error(`User ${authenticatedUser.userId} is not authorised to read message ${messageId.toHexString()}`);
            throw new apollo_server_errors_1.ForbiddenError(`User is not authorised to read this message`);
        }
        return this.messageData.getMessage(messageId.toHexString());
    }
    async getBlockedUserIds(contexts, paginatedChatMessages, conversationId) {
        const isDirectConversation = this.conversationLogic.isDirectConversation(contexts);
        const userIds = paginatedChatMessages.messages
            .map((message) => new mongodb_1.ObjectID(message.sender.id))
            .filter((userId, index, allUserIds) => allUserIds.indexOf(userId) === index);
        let blockedScope = {
            scopeId: new mongodb_1.ObjectID(String(conversationId)),
            scope: ContextSchema_dto_1.ContextType.isDirectConversation,
        };
        if (!isDirectConversation) {
            // Scope is not-nullable -> getting universityId from conversation context instead of authenticatedUser
            const universityIds = (0, extractUniversityIdsFromContext_1.extractUniversityIdsFromContext)({
                conversationContext: contexts,
            });
            if (!universityIds || universityIds.length === 0)
                throw new Error('University not found to get conversation messages');
            const universityId = universityIds[0];
            blockedScope = {
                scopeId: new mongodb_1.ObjectID(String(universityId)),
                scope: ContextSchema_dto_1.ContextType.university,
            };
        }
        const blockedUsers = await this.userBlocks.getBlockedUsers(userIds, blockedScope);
        return blockedUsers.map((user) => user.blockedUserId);
    }
    async getChatConversationMessages(getMessageDto, authenticatedUser) {
        if (!(await this.permissions.conversationPermissions({
            user: authenticatedUser,
            conversationId: String(getMessageDto.conversationId),
            action: permissions_model_1.Action.readConversation,
        }))) {
            throw new apollo_server_errors_1.ForbiddenError(`User is not authorised to read this conversation`);
        }
        const [paginatedChatMessages, conversation] = await Promise.all([
            this.messageData.getChatConversationMessages(getMessageDto),
            this.conversationLogic.getConversation(String(getMessageDto.conversationId), authenticatedUser),
        ]);
        const blockedUserIds = await this.getBlockedUserIds(conversation.context, paginatedChatMessages, getMessageDto.conversationId);
        paginatedChatMessages.messages = this.setIsSenderBlockedTrue(paginatedChatMessages, blockedUserIds);
        return paginatedChatMessages;
    }
    async getMessagesByConversation(messagesFilterInput) {
        const { conversationIds, startDate, endDate } = messagesFilterInput;
        return await this.messageData.getMessagesGroupedByConversation(conversationIds.map((id) => new mongoose_1.Types.ObjectId(id)), startDate, endDate);
    }
    setIsSenderBlockedTrue(chatMessages, blockedUserIds) {
        const messagesWithBlockedFlag = chatMessages.messages.map((message) => {
            if (blockedUserIds.some((i) => i.toHexString() === message.sender.id)) {
                return { ...message, isSenderBlocked: true };
            }
            return message;
        });
        return messagesWithBlockedFlag;
    }
    async delete(deleteMessageDto, authenticatedUser) {
        if (!(await this.permissions.messagePermissions({
            user: authenticatedUser,
            messageId: String(deleteMessageDto.messageId),
            action: permissions_model_1.Action.deleteMessage,
        }))) {
            throw new apollo_server_errors_1.ForbiddenError(`User is not authorised to delete this message`);
        }
        const message = await this.messageData.delete(deleteMessageDto.messageId);
        const deleteMessageEvent = new conversation_channel_socket_1.DeleteMessageEvent({
            id: message.id,
        });
        this.conversationChannel.send(deleteMessageEvent, deleteMessageDto.conversationId.toHexString());
        return message;
    }
    async resolve(resolveMessageDto, authenticatedUser) {
        if (!authenticatedUser) {
            throw new apollo_server_errors_1.ForbiddenError('User is not authenticated');
        }
        if (!(await this.permissions.messagePermissions({
            user: authenticatedUser,
            messageId: String(resolveMessageDto.messageId),
            action: permissions_model_1.Action.resolveMessage,
        }))) {
            throw new apollo_server_errors_1.ForbiddenError(`User is not authorised to resolve this message`);
        }
        const message = await this.messageData.resolve(resolveMessageDto.messageId);
        const resolveMessageEvent = new conversation_channel_socket_1.ResolveMessageEvent({
            id: message.id,
        });
        this.conversationChannel.send(resolveMessageEvent, resolveMessageDto.conversationId.toHexString());
        return message;
    }
    async unresolve(resolveMessageDto, authenticatedUser) {
        if (!authenticatedUser) {
            throw new apollo_server_errors_1.ForbiddenError('User is not authenticated');
        }
        if (!(await this.permissions.messagePermissions({
            user: authenticatedUser,
            messageId: String(resolveMessageDto.messageId),
            action: permissions_model_1.Action.resolveMessage,
        }))) {
            throw new apollo_server_errors_1.ForbiddenError(`User is not authorised to resolve this message`);
        }
        const message = await this.messageData.unresolve(resolveMessageDto.messageId);
        const unresolveMessageEvent = new conversation_channel_socket_1.UnresolveMessageEvent({
            id: message.id,
        });
        this.conversationChannel.send(unresolveMessageEvent, resolveMessageDto.conversationId.toHexString());
        return message;
    }
    async like(likeMessageDto, authenticatedUser) {
        await this.throwForbiddenErrorIfNotAuthorized(authenticatedUser, likeMessageDto.messageId, permissions_model_1.Action.readConversation);
        const message = await this.messageData.like(likeMessageDto.userId, likeMessageDto.messageId);
        const likeMessageEvent = new conversation_channel_socket_1.LikeMessageEvent({
            userId: likeMessageDto.userId,
            messageId: likeMessageDto.messageId,
        });
        this.conversationChannel.send(likeMessageEvent, likeMessageDto.conversationId.toHexString());
        return message;
    }
    async unlike(likeMessageDto, authenticatedUser) {
        await this.throwForbiddenErrorIfNotAuthorized(authenticatedUser, likeMessageDto.messageId, permissions_model_1.Action.readConversation);
        const message = await this.messageData.unlike(likeMessageDto.userId, likeMessageDto.messageId);
        const unlikeMessageEvent = new conversation_channel_socket_1.UnlikeMessageEvent({
            userId: likeMessageDto.userId,
            messageId: likeMessageDto.messageId,
        });
        this.conversationChannel.send(unlikeMessageEvent, likeMessageDto.conversationId.toHexString());
        return message;
    }
    async throwForbiddenErrorIfNotAuthorized(authenticatedUser, messageId, action) {
        const result = await this.permissions.messagePermissions({
            user: authenticatedUser,
            messageId: String(messageId),
            action,
        });
        if (!result) {
            throw new apollo_server_errors_1.ForbiddenError('User is not authorised to perform this action');
        }
    }
    async addReactionToMessage(reaction, authenticatedUser) {
        await this.throwForbiddenErrorIfNotAuthorized(authenticatedUser, reaction.messageId, permissions_model_1.Action.readConversation);
        const message = await this.messageData.addReaction(reaction.reaction, authenticatedUser.userId, reaction.reactionUnicode, reaction.messageId);
        const messageEvent = new conversation_channel_socket_1.ReactedMessageEvent({
            userId: authenticatedUser.userId,
            messageId: reaction.messageId,
            reaction: reaction.reaction,
            reactionUnicode: reaction.reactionUnicode,
        });
        this.conversationChannel.send(messageEvent, reaction.conversationId.toHexString());
        return message;
    }
    async removeReactionFromMessage(reaction, authenticatedUser) {
        await this.throwForbiddenErrorIfNotAuthorized(authenticatedUser, reaction.messageId, permissions_model_1.Action.readConversation);
        const message = await this.messageData.removeReaction(reaction.reaction, authenticatedUser.userId, reaction.messageId);
        const messageEvent = new conversation_channel_socket_1.UnReactedMessageEvent({
            userId: authenticatedUser.userId,
            messageId: reaction.messageId,
            reaction: reaction.reaction,
            reactionUnicode: reaction.reactionUnicode,
        });
        this.conversationChannel.send(messageEvent, reaction.conversationId.toHexString());
        return message;
    }
    async updateTags(tags, authenticatedUser) {
        await this.throwForbiddenErrorIfNotAuthorized(authenticatedUser, tags.messageId, permissions_model_1.Action.readConversation);
        const message = await this.messageData.updateTags(tags.messageId, tags.tags);
        return message;
    }
    async listByKeys(ids) {
        return this.messageData.getMessages(ids);
    }
    async addVote(chatMessageId, option, authenticatedUser) {
        var _a, _b, _c, _d, _e, _f;
        await this.throwForbiddenErrorIfNotAuthorized(authenticatedUser, chatMessageId, permissions_model_1.Action.readConversation);
        const message = await this.messageData.getMessage(chatMessageId.toHexString());
        const pollOption = this.validateOption(message, option);
        // Check if user is trying to vote for the same option again
        if (pollOption.votes) {
            const votes = new Set();
            pollOption.votes.forEach((vote) => {
                votes.add(vote.toHexString());
            });
            const hasUserVoted = votes.has(authenticatedUser.userId.toHexString());
            if (hasUserVoted) {
                throw new Error(`You have already voted for option: ${option}`);
            }
        }
        // If poll is single vote option throw an error if user has voted for different option
        if (!((_b = (_a = message.richContent) === null || _a === void 0 ? void 0 : _a.poll) === null || _b === void 0 ? void 0 : _b.allowMultipleAnswers)) {
            const users = new Set();
            (_d = (_c = message.richContent) === null || _c === void 0 ? void 0 : _c.poll) === null || _d === void 0 ? void 0 : _d.options.forEach((pollOption) => {
                var _a;
                (_a = pollOption.votes) === null || _a === void 0 ? void 0 : _a.forEach((vote) => {
                    users.add(vote.toHexString());
                });
            });
            if (users.has(authenticatedUser.userId.toHexString())) {
                throw new Error(`You can not vote for multiple options with allowMultipleAnswers: ${(_f = (_e = message.richContent) === null || _e === void 0 ? void 0 : _e.poll) === null || _f === void 0 ? void 0 : _f.allowMultipleAnswers}`);
            }
        }
        return await this.messageData.addVote(chatMessageId, authenticatedUser.userId, option);
    }
    async removeVote(chatMessageId, option, authenticatedUser) {
        await this.throwForbiddenErrorIfNotAuthorized(authenticatedUser, chatMessageId, permissions_model_1.Action.readConversation);
        const message = await this.messageData.getMessage(chatMessageId.toHexString());
        const pollOption = this.validateOption(message, option);
        if (pollOption.votes === undefined) {
            throw new Error(`Unable to remove your vote from an option you haven't voted for`);
        }
        // Check if user is trying to remove vote for the same option again
        if (pollOption.votes) {
            const votes = new Set();
            pollOption.votes.forEach((vote) => {
                votes.add(vote.toHexString());
            });
            const hasUserVoted = votes.has(authenticatedUser.userId.toHexString());
            if (!hasUserVoted) {
                throw new Error(`Unable to remove your vote from an option you haven't voted for`);
            }
        }
        return await this.messageData.removeVote(chatMessageId, authenticatedUser.userId, option);
    }
    validateOption(message, option) {
        var _a, _b, _c, _d;
        // Get the option index for input Option
        const optionIndex = (_b = (_a = message.richContent) === null || _a === void 0 ? void 0 : _a.poll) === null || _b === void 0 ? void 0 : _b.options.findIndex((pollOption) => pollOption.option === option);
        if (optionIndex === -1 || optionIndex === undefined) {
            throw new Error(`Option "${option}" not found in the poll`);
        }
        // Get the poll option which has {option and votes}
        const pollOption = (_d = (_c = message.richContent) === null || _c === void 0 ? void 0 : _c.poll) === null || _d === void 0 ? void 0 : _d.options[optionIndex];
        if (!pollOption) {
            throw new Error(`Option "${option}" not found in the poll`);
        }
        return pollOption;
    }
};
MessageLogic = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => conversation_logic_1.ConversationLogic))),
    tslib_1.__metadata("design:paramtypes", [conversation_logic_1.ConversationLogic,
        message_data_1.MessageData,
        permissions_service_1.PermissionsService,
        conversation_channel_socket_1.ConversationChannel,
        user_service_1.UserService,
        conversation_data_1.ConversationData,
        safeguarding_service_1.SafeguardingService,
        user_blocks_logic_1.UserBlocksLogic])
], MessageLogic);
exports.MessageLogic = MessageLogic;
//# sourceMappingURL=message.logic.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageData = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const message_model_1 = require("./models/message.model");
const message_helper_1 = require("./utils/message.helper");
let MessageData = class MessageData {
    constructor(chatMessageModel) {
        this.chatMessageModel = chatMessageModel;
    }
    async create(data, senderId) {
        const chatMessage = new this.chatMessageModel();
        chatMessage.text = data.text;
        chatMessage.senderId = senderId;
        chatMessage.conversationId = data.conversationId;
        chatMessage.created = new Date();
        chatMessage.deleted = false;
        (0, message_helper_1.createRichContent)(data, chatMessage);
        const dbResult = await chatMessage.save();
        return (0, message_model_1.chatMessageToObject)(dbResult);
    }
    async getMessage(messageId) {
        const message = await this.chatMessageModel.findById(messageId);
        if (!message)
            throw new Error('Message not found');
        return (0, message_model_1.chatMessageToObject)(message);
    }
    async getChatConversationMessages(data) {
        let hasMore = false;
        // TODO Min - Max on limit. There is an issue
        // with using a limit of zero as it would return
        // all messages from a conversation
        if (data.limit === 0)
            data.limit = 40;
        const hasMoreLimit = data.limit + 1;
        const query = {
            conversationId: data.conversationId,
        };
        if (data.offsetId) {
            query['_id'] = { $lt: data.offsetId };
        }
        const result = await this.chatMessageModel
            .find(query)
            .limit(hasMoreLimit)
            .sort({
            _id: -1,
        });
        // If the data returned is the same length as the increased limit,
        // we need to ensure we reduce the limit back down to the original
        // limit requested in the api call.
        if (result.length === hasMoreLimit) {
            result.splice(data.limit);
            hasMore = true;
        }
        // We reverse the array here, because to get the correct offset we
        // need to assert that we are getting the last N (limit) messages before
        // the offset in ascending order (oldest message first => newest message).
        // If we didn't do it this way round we would get the first N messages
        // ever created in the dataset
        result.reverse();
        return { messages: result.map(message_model_1.chatMessageToObject), hasMore };
    }
    async delete(messageId) {
        const query = { _id: messageId };
        const updateDocument = { deleted: true };
        const doDelete = await this.chatMessageModel.findOneAndUpdate(query, updateDocument, {
            new: true,
            returnOriginal: false,
        });
        if (!doDelete)
            throw new Error('The message to delete does not exist');
        return (0, message_model_1.chatMessageToObject)(doDelete);
    }
    async resolve(messageId) {
        const filterBy = { _id: messageId };
        const updateProperty = { resolved: true };
        const resolved = await this.chatMessageModel.findOneAndUpdate(filterBy, updateProperty, {
            new: true,
            returnOriginal: false,
        });
        if (!resolved)
            throw new Error('The message to resolve does not exist');
        return (0, message_model_1.chatMessageToObject)(resolved);
    }
    async unresolve(messageId) {
        const filterBy = { _id: messageId };
        const updateProperty = { resolved: false };
        const unresolved = await this.chatMessageModel.findOneAndUpdate(filterBy, updateProperty, {
            new: true,
            returnOriginal: false,
        });
        if (!unresolved)
            throw new Error('The message to unresolve does not exist');
        return (0, message_model_1.chatMessageToObject)(unresolved);
    }
    async like(userId, messageId) {
        const query = { _id: messageId };
        const updateDocument = {
            $addToSet: { likes: userId },
        };
        const like = await this.chatMessageModel.findOneAndUpdate(query, updateDocument, {
            new: true,
            returnOriginal: false,
        });
        if (!like)
            throw new Error('The message to like does not exist');
        return (0, message_model_1.chatMessageToObject)(like);
    }
    async unlike(userId, messageId) {
        const query = { _id: messageId };
        const updateDocument = {
            $pull: { likes: userId },
        };
        const unlike = await this.chatMessageModel.findOneAndUpdate(query, updateDocument, {
            new: true,
            returnOriginal: false,
        });
        if (!unlike)
            throw new Error('The message to unlike does not exist');
        return (0, message_model_1.chatMessageToObject)(unlike);
    }
    async addReaction(reaction, userId, reactionUnicode, messageId) {
        const updatedResult = await this.chatMessageModel.bulkWrite([
            {
                updateOne: {
                    filter: {
                        _id: messageId,
                        reactions: {
                            $elemMatch: { reaction: reaction },
                        },
                    },
                    update: {
                        $addToSet: { 'reactions.$.userIds': userId },
                    },
                },
            },
            {
                updateOne: {
                    filter: {
                        _id: messageId,
                        reactions: {
                            $not: {
                                $elemMatch: { reaction: reaction },
                            },
                        },
                    },
                    update: {
                        $push: {
                            reactions: {
                                reaction: reaction,
                                userIds: [userId],
                                reactionUnicode: reactionUnicode,
                            },
                        },
                    },
                },
            },
        ]);
        if (!updatedResult || updatedResult.matchedCount === 0) {
            throw new Error(`Failed to add reaction, messageId: ${messageId.toHexString()}, reaction: ${reaction}, userId: ${userId.toHexString()}`);
        }
        return this.getMessage(messageId.toHexString());
    }
    async removeReaction(reaction, userId, messageId) {
        const updatedResult = await this.chatMessageModel.bulkWrite([
            {
                updateOne: {
                    filter: {
                        _id: messageId,
                        reactions: {
                            $elemMatch: { reaction: reaction, userIds: userId },
                        },
                    },
                    update: {
                        $pull: { 'reactions.$.userIds': userId },
                    },
                },
            },
            {
                updateOne: {
                    filter: {
                        _id: messageId,
                        reactions: {
                            $elemMatch: { reaction: reaction, userIds: [] },
                        },
                    },
                    update: {
                        $pull: { reactions: { reaction: reaction } },
                    },
                },
            },
        ]);
        if (!updatedResult || updatedResult.matchedCount === 0) {
            throw new Error(`Failed to remove reaction, messageId: ${messageId.toHexString()}, reaction: ${reaction}, userId: ${userId.toHexString()}`);
        }
        return this.getMessage(messageId.toHexString());
    }
    async updateTags(messageId, tags) {
        const result = await this.chatMessageModel.findOneAndUpdate({ _id: messageId }, { $set: { tags } }, { new: true });
        if (!result)
            throw new Error('Could not update tags on message');
        return (0, message_model_1.chatMessageToObject)(result);
    }
    async getMessages(ids) {
        const chatMessages = await this.chatMessageModel.find({
            _id: { $in: ids },
        });
        return chatMessages.map((chatMessage) => (0, message_model_1.chatMessageToObject)(chatMessage));
    }
    async getMessagesGroupedByConversation(conversationIds, startDate, endDate) {
        const matchQuery = {
            $match: {
                conversationId: {
                    $in: conversationIds,
                },
            },
        };
        if (startDate && endDate) {
            matchQuery['$match']['created'] = {
                $gte: new Date(new Date(startDate).setHours(0, 0, 0, 0)),
                $lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)),
            };
        }
        const groupedChatMessages = await this.chatMessageModel.aggregate([
            matchQuery,
            {
                $group: {
                    _id: '$conversationId',
                    messages: {
                        $push: {
                            senderId: '$senderId',
                            message: '$text',
                        },
                    },
                },
            },
            {
                $project: {
                    conversationId: '$_id',
                    messages: 1,
                },
            },
        ]);
        return groupedChatMessages;
    }
    async addVote(messageId, userId, option) {
        const query = {
            _id: messageId,
            'richContent.poll.options.option': option,
        };
        const updateDocument = {
            $addToSet: { 'richContent.poll.options.$.votes': userId },
        };
        const updatedResult = await this.chatMessageModel.findOneAndUpdate(query, updateDocument, {
            new: true,
            returnOriginal: false,
        });
        if (!updatedResult) {
            throw new Error(`Failed to add user: ${userId.toHexString()} to option: ${option} for messageId: ${messageId.toHexString()}`);
        }
        return (0, message_model_1.chatMessageToObject)(updatedResult);
    }
    async removeVote(messageId, userId, option) {
        const query = {
            _id: messageId,
            'richContent.poll.options.option': option,
        };
        const updateDocument = {
            $pull: { 'richContent.poll.options.$.votes': userId },
        };
        const updatedResult = await this.chatMessageModel.findOneAndUpdate(query, updateDocument, {
            new: true,
            returnOriginal: false,
        });
        if (!updatedResult) {
            throw new Error(`Failed to remove user: ${userId.toHexString()} from option: ${option} for messageId: ${messageId.toHexString()}`);
        }
        return (0, message_model_1.chatMessageToObject)(updatedResult);
    }
};
MessageData = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(message_model_1.ChatMessageModel.name)),
    tslib_1.__metadata("design:paramtypes", [mongoose_2.Model])
], MessageData);
exports.MessageData = MessageData;
//# sourceMappingURL=message.data.js.map
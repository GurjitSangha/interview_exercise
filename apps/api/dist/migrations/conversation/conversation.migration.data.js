"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationMigrationData = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const conversation_model_1 = require("../../conversation/models/conversation.model");
const message_data_1 = require("../../message/message.data");
const conversation_data_1 = require("../../conversation/conversation.data");
let ConversationMigrationData = class ConversationMigrationData {
    constructor(chatConversationModel, messageData, conversationData) {
        this.chatConversationModel = chatConversationModel;
        this.messageData = messageData;
        this.conversationData = conversationData;
    }
    async migrateLastMessagesForEveryConversation() {
        var _a;
        try {
            const conversations = await this.chatConversationModel.find({}, { _id: 1, lastMessageId: 1 });
            console.log(`Found ${conversations.length} conversations`);
            for (const conversation of conversations) {
                if (!conversation.lastMessageId) {
                    // get most recent message for each conversation
                    // assumes the conversations are sorted in getChatConversationMessages
                    const latestMessage = await this.messageData.getChatConversationMessages({
                        conversationId: conversation._id,
                        limit: 1,
                    });
                    if ((_a = latestMessage.messages) === null || _a === void 0 ? void 0 : _a.length) {
                        const messageId = latestMessage.messages[0].id;
                        console.log(`setting last message of ${conversation.id} to ${messageId}`);
                        try {
                            await this.conversationData.updateConversationWithLastMessage(conversation._id.toHexString(), messageId);
                        }
                        catch (e) {
                            if (e instanceof SyntaxError) {
                                console.log('Skipping parsing error due to bad data');
                            }
                            else {
                                throw e;
                            }
                        }
                    }
                    else {
                        console.log(`There are no messages in the conversation: ${conversation.id}`);
                    }
                }
            }
            return true;
        }
        catch (error) {
            console.log('Error setting last messages, ', error);
            return false;
        }
    }
};
ConversationMigrationData = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(conversation_model_1.ChatConversationModel.name)),
    tslib_1.__metadata("design:paramtypes", [mongoose_2.Model,
        message_data_1.MessageData,
        conversation_data_1.ConversationData])
], ConversationMigrationData);
exports.ConversationMigrationData = ConversationMigrationData;
//# sourceMappingURL=conversation.migration.data.js.map
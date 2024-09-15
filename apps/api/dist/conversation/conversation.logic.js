"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationLogic = void 0;
const tslib_1 = require("tslib");
const DirectConversationDefaultPermission_1 = require("./dto/DirectConversationDefaultPermission");
const common_1 = require("@nestjs/common");
const apollo_server_express_1 = require("apollo-server-express");
const mongodb_1 = require("mongodb");
const permissions_service_1 = require("../permissions/permissions.service");
const permissions_model_1 = require("../permissions/models/permissions.model");
const ContextSchema_dto_1 = require("./models/ContextSchema.dto");
const conversation_data_1 = require("./conversation.data");
const conversation_model_1 = require("./models/conversation.model");
const message_logic_1 = require("../message/message.logic");
const conversation_channel_socket_1 = require("./conversation-channel.socket");
const safeguarding_service_1 = require("../safeguarding/safeguarding.service");
const user_service_1 = require("../user/user.service");
let ConversationLogic = class ConversationLogic {
    constructor(conversationData, permissions, messageLogic, conversationChannel, safeguardingService, userService) {
        this.conversationData = conversationData;
        this.permissions = permissions;
        this.messageLogic = messageLogic;
        this.conversationChannel = conversationChannel;
        this.safeguardingService = safeguardingService;
        this.userService = userService;
    }
    async getConversation(id, authenticatedUser) {
        if (!(await this.permissions.conversationPermissions({
            user: authenticatedUser,
            conversationId: id,
            action: permissions_model_1.Action.readConversation,
        }))) {
            throw new apollo_server_express_1.ForbiddenError(`User is not authorised to view this conversation`);
        }
        return this.conversationData.getConversation(id);
    }
    isDirectConversation(contexts) {
        const directConversationContext = contexts.find((context) => context.type === ContextSchema_dto_1.ContextType.isDirectConversation);
        return directConversationContext != null;
    }
    async getConversationsForInbox(authenticatedUser, contexts) {
        // TODO: we should probably add a permissions check here
        return this.conversationData.getConversationsForInbox(authenticatedUser.userId.toHexString(), contexts);
    }
    async removeMember(conversationId, memberId) {
        const member = await this.userService.getUser(memberId);
        const userLeftEvent = new conversation_channel_socket_1.UserLeftConversationEvent(member);
        this.conversationChannel.send(userLeftEvent, conversationId);
        return this.conversationData.removeMember(conversationId, memberId);
    }
    async addMember(conversationId, addMember) {
        const member = await this.userService.getUser(addMember.userId);
        const userJoinedEvent = new conversation_channel_socket_1.UserJoinedConversationEvent(member);
        this.conversationChannel.send(userJoinedEvent, conversationId);
        return this.conversationData.addMember(conversationId, addMember);
    }
    async pinMessage(pinMessageDTO, authenticatedUser) {
        const { conversationId, messageId } = pinMessageDTO;
        if (!(await this.permissions.conversationPermissions({
            user: authenticatedUser,
            conversationId,
            action: permissions_model_1.Action.pinMessage,
        }))) {
            throw new apollo_server_express_1.ForbiddenError(`User is not authorised to pin a message to this conversation`);
        }
        // Check conversation exists
        try {
            await this.conversationData.getConversation(conversationId);
        }
        catch (error) {
            throw new apollo_server_express_1.UserInputError('Cannot pin message: conversation not found');
        }
        await this.sendPinMessageEvent(authenticatedUser, new mongodb_1.ObjectID(conversationId), messageId);
        return await this.conversationData.pinMessage(conversationId, messageId);
    }
    async unpinMessage(unpinMessageDTO, authenticatedUser) {
        const { conversationId, messageId } = unpinMessageDTO;
        if (!(await this.permissions.conversationPermissions({
            user: authenticatedUser,
            conversationId,
            action: permissions_model_1.Action.pinMessage,
        }))) {
            throw new apollo_server_express_1.ForbiddenError(`User is not authorised to unpin a message from this conversation`);
        }
        // Check conversation exists
        try {
            await this.conversationData.getConversation(conversationId);
        }
        catch (error) {
            throw new apollo_server_express_1.UserInputError('Cannot unpin message: conversation not found');
        }
        const unpinMessageEvent = new conversation_channel_socket_1.UnpinMessageEvent({ id: messageId });
        this.conversationChannel.send(unpinMessageEvent, conversationId);
        return await this.conversationData.unpinMessage(conversationId, messageId);
    }
    async blockMember(conversationIds, memberId) {
        await this.conversationData.blockMember(conversationIds, memberId);
        console.log(`User ${memberId} successfully blocked from conversations: ${conversationIds}`);
    }
    async unblockMember(conversationIds, memberId) {
        await this.conversationData.unblockMember(conversationIds, memberId);
        console.log(`User ${memberId} successfully unblocked from conversations: ${conversationIds}`);
    }
    async create(createChatConversationDto) {
        return this.conversationData.create(createChatConversationDto);
    }
    async getExistingDirectConversation(memberIds) {
        // find if there is direct conversation exists between given two userIds
        return this.conversationData.getConversationByAllMemberIdsAndContext(memberIds, [new ContextSchema_dto_1.ContextSchema(true, ContextSchema_dto_1.ContextType.isDirectConversation)]);
    }
    async createDirectChatConversation(directChatConversationDto) {
        const memberIds = [
            directChatConversationDto.userToConverseWith,
            directChatConversationDto.currentUserId,
        ];
        // find if there is direct conversation exists between given two userIds
        const conversation = await this.getExistingDirectConversation(memberIds);
        if (conversation) {
            // return existing conversation
            return conversation;
        }
        // when existing not found create a new one
        const model = new conversation_model_1.ChatConversationModel();
        model.context = directChatConversationDto.context
            ? directChatConversationDto.context
            : [];
        this.setDirectMessageContextIfNeeded(model.context);
        model.product = directChatConversationDto.product;
        model.memberIds = memberIds;
        model.permissions = DirectConversationDefaultPermission_1.DirectConversationDefaultPermissions;
        return this.conversationData.createChatConversation(model);
    }
    setDirectMessageContextIfNeeded(context) {
        const directConversationContext = context === null || context === void 0 ? void 0 : context.find((cntx) => cntx.type === ContextSchema_dto_1.ContextType.isDirectConversation);
        if (!directConversationContext) {
            context.push(new ContextSchema_dto_1.ContextSchema(true, ContextSchema_dto_1.ContextType.isDirectConversation));
        }
    }
    async migratePermissions(chatPermissionsDto, product, conversationIds) {
        this.conversationData.migratePermissions(chatPermissionsDto, product, conversationIds);
    }
    async recordLastMessageReadByUser({ conversationId, messageId, authenticatedUser, }) {
        if (!(await this.permissions.conversationPermissions({
            user: authenticatedUser,
            conversationId: conversationId,
            action: permissions_model_1.Action.readConversation,
        }))) {
            throw new apollo_server_express_1.ForbiddenError(`User is not authorised to read this conversation`);
        }
        return this.conversationData.recordLastMessageReadByUser({
            conversationId,
            messageId,
            authenticatedUser,
        });
    }
    async getLastRead(authenticatedUser, conversationId) {
        return await this.conversationData.getLastRead(authenticatedUser, conversationId);
    }
    /* Finds unread message counts across all conversations for a user */
    async getUnreadMessageCounts(unreadCountInput) {
        return this.conversationData.getUnreadMessageCounts(unreadCountInput);
    }
    /* Finds unread message counts in a single conversation for a user */
    async getUnreadCountInConversation(authenticatedUser, conversationId) {
        if (!(await this.permissions.conversationPermissions({
            user: authenticatedUser,
            conversationId: conversationId,
            action: permissions_model_1.Action.readConversation,
        }))) {
            throw new apollo_server_express_1.ForbiddenError(`User is not authorised to view this conversation`);
        }
        return this.conversationData.getUnreadCountInConversation(authenticatedUser.userId.toHexString(), conversationId);
    }
    /* lists lastMessage(s) across all conversations for a user
     * to be used by dataloader to load lastMessage in conversation */
    async getLastMessages(lastMessageInput) {
        return this.conversationData.getLastMessages(lastMessageInput);
    }
    async updateTags(conversationId, tags) {
        try {
            const updatedRecord = await this.conversationData.updateTags(conversationId, tags);
            return updatedRecord;
        }
        catch (error) {
            throw new common_1.HttpException('Conversation not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async sendPinMessageEvent(authenticatedUser, conversationId, messageId) {
        var _a, _b;
        const message = await this.messageLogic.getMessage(messageId, authenticatedUser);
        const sender = await this.userService.getUser(message.senderId.toHexString());
        let richContent;
        if ((_a = message.richContent) === null || _a === void 0 ? void 0 : _a.reply) {
            const replyMessage = await this.messageLogic.getMessage(message.richContent.reply.id, authenticatedUser);
            if (replyMessage) {
                const replyMessageUser = await this.userService.getUser(replyMessage.senderId.toHexString());
                richContent = {
                    reply: {
                        id: replyMessage.id,
                        text: this.safeguardingService.clean(replyMessage.text),
                        created: replyMessage.created,
                        deleted: replyMessage.deleted,
                        richContent: (replyMessage === null || replyMessage === void 0 ? void 0 : replyMessage.richContent) || undefined,
                        sender: {
                            id: replyMessageUser.id,
                            firstName: replyMessageUser.firstName,
                            accountRole: replyMessageUser.accountRole,
                            profilePhoto: replyMessageUser.profilePhoto,
                        },
                    },
                };
            }
        }
        if ((_b = message.richContent) === null || _b === void 0 ? void 0 : _b.giphy) {
            const { id, type, width, height, aspectRatio } = message.richContent.giphy;
            const trimmedAspectRatio = Number(aspectRatio.toPrecision(3));
            richContent = {
                ...(richContent || {}),
                giphy: { id, type, width, height, aspectRatio: trimmedAspectRatio },
            };
        }
        const pinMessageEvent = new conversation_channel_socket_1.PinMessageEvent({
            id: messageId,
            message: {
                id: message.id,
                text: this.safeguardingService.clean(message.text),
                created: message.created,
                sender: {
                    id: sender.id,
                    firstName: sender.firstName,
                    profilePhoto: sender.profilePhoto,
                    accountRole: sender.accountRole,
                },
                deleted: message.deleted,
                likes: message.likes,
                likesCount: message.likesCount,
                richContent: richContent,
                resolved: message.resolved,
            },
        });
        this.conversationChannel.send(pinMessageEvent, conversationId.toHexString());
    }
    async getMessagesByConversation(messagesFilterInput) {
        return await this.messageLogic.getMessagesByConversation(messagesFilterInput);
    }
};
ConversationLogic = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [conversation_data_1.ConversationData,
        permissions_service_1.PermissionsService,
        message_logic_1.MessageLogic,
        conversation_channel_socket_1.ConversationChannel,
        safeguarding_service_1.SafeguardingService,
        user_service_1.UserService])
], ConversationLogic);
exports.ConversationLogic = ConversationLogic;
//# sourceMappingURL=conversation.logic.js.map
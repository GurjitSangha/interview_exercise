"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationResolver = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const DataLoader = require("dataloader");
const req_utils_1 = require("../utils/req.utils");
const GqlAuthGuard_1 = require("../authentication/GqlAuthGuard");
const jwt_strategy_1 = require("../authentication/jwt.strategy");
const conversation_logic_1 = require("./conversation.logic");
const ChatConversation_entity_1 = require("./models/ChatConversation.entity");
const markReadMessage_input_1 = require("./models/markReadMessage.input");
const LastRead_entity_1 = require("./models/LastRead.entity");
const message_entity_1 = require("../message/models/message.entity");
const pinnedMessages_dto_1 = require("./models/pinnedMessages.dto");
const message_dataloader_1 = require("../message/message.dataloader");
let ConversationResolver = class ConversationResolver {
    constructor(conversationLogic, chatMessageDataLoader) {
        this.conversationLogic = conversationLogic;
        this.chatMessageDataLoader = chatMessageDataLoader;
    }
    /**
     * Note: GqlAuthGuardForReference patches a bug emerging from @nestjs/graphql
     * wherein the GqlExecutionContext receives just 3 arguments instead of
     * 4 after the context passes from ResolveReference.
     * The sequence of root, context, arg, info has changed into
     * root, arg, context, info. Hence it is essential to put that
     * _arg before the context as the set of arguments in the resolveReference
     **/
    resolveReference(reference, _args, // Dont remove this. Read function docs
    ctx) {
        // TODO: Implement data loading
        return this.conversationLogic.getConversation(reference.id, (0, req_utils_1.getUserFromGqlContext)(ctx));
    }
    getChatConversation(id, authenticatedUser) {
        return this.conversationLogic.getConversation(id, authenticatedUser);
    }
    async unreadMessageCount(conversation, authenticatedUser) {
        // TODO: Redo data loading
        const proxyUnread = (ids) => {
            const conversationIds = ids.map((id) => id);
            return this.conversationLogic.getUnreadMessageCounts({
                userId: authenticatedUser.userId.toHexString(),
                conversationIds,
            });
        };
        const unreadCountLoader = new DataLoader(proxyUnread);
        const unreadCountObject = await unreadCountLoader.load(conversation.id);
        return unreadCountObject.unreadMessageCount;
    }
    async lastMessage(conversation) {
        if (conversation.lastMessageId) {
            return await this.chatMessageDataLoader.load(conversation.lastMessageId);
        }
        return undefined;
    }
    async recordLastMessageReadByUser(markReadMessageDto, authenticatedUser) {
        return await this.conversationLogic.recordLastMessageReadByUser({
            ...markReadMessageDto,
            authenticatedUser,
        });
    }
    async pinMessageInConversation(pinMessageDTO, authenticatedUser) {
        return await this.conversationLogic.pinMessage(pinMessageDTO, authenticatedUser);
    }
    async unpinMessageInConversation(unpinMessageDTO, authenticatedUser) {
        return await this.conversationLogic.unpinMessage(unpinMessageDTO, authenticatedUser);
    }
    async pinnedMessages(conversation) {
        const pinnedMessages = conversation.pinnedMessages || [];
        return await this.chatMessageDataLoader.loadMany(pinnedMessages);
    }
    async pinnedMessagesCount(conversation) {
        const pinnedMessages = conversation.pinnedMessages || [];
        const pinnedMessageCount = await (await this.chatMessageDataLoader.loadMany(pinnedMessages)).length;
        return pinnedMessageCount;
    }
};
tslib_1.__decorate([
    (0, common_1.UseGuards)(GqlAuthGuard_1.GqlAuthGuardForReference),
    (0, graphql_1.ResolveReference)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ConversationResolver.prototype, "resolveReference", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => ChatConversation_entity_1.ChatConversation),
    (0, common_1.UseGuards)(GqlAuthGuard_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('id')),
    tslib_1.__param(1, (0, jwt_strategy_1.AuthenticatedUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ConversationResolver.prototype, "getChatConversation", null);
tslib_1.__decorate([
    (0, graphql_1.ResolveField)(() => Number),
    (0, common_1.UseGuards)(GqlAuthGuard_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Parent)()),
    tslib_1.__param(1, (0, jwt_strategy_1.AuthenticatedUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [ChatConversation_entity_1.ChatConversation, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ConversationResolver.prototype, "unreadMessageCount", null);
tslib_1.__decorate([
    (0, graphql_1.ResolveField)(() => message_entity_1.ChatMessage),
    (0, common_1.UseGuards)(GqlAuthGuard_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Parent)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ConversationResolver.prototype, "lastMessage", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => LastRead_entity_1.LastRead),
    (0, common_1.UseGuards)(GqlAuthGuard_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('markReadMessageDto')),
    tslib_1.__param(1, (0, jwt_strategy_1.AuthenticatedUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [markReadMessage_input_1.MarkReadMessageDTO, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ConversationResolver.prototype, "recordLastMessageReadByUser", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => ChatConversation_entity_1.ChatConversation),
    (0, common_1.UseGuards)(GqlAuthGuard_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('pinMessageDTO')),
    tslib_1.__param(1, (0, jwt_strategy_1.AuthenticatedUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [pinnedMessages_dto_1.pinMessageDTO, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ConversationResolver.prototype, "pinMessageInConversation", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => ChatConversation_entity_1.ChatConversation),
    (0, common_1.UseGuards)(GqlAuthGuard_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('unpinMessageDTO')),
    tslib_1.__param(1, (0, jwt_strategy_1.AuthenticatedUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [pinnedMessages_dto_1.unpinMessageDTO, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ConversationResolver.prototype, "unpinMessageInConversation", null);
tslib_1.__decorate([
    (0, graphql_1.ResolveField)('pinnedMessages', () => [message_entity_1.ChatMessage]),
    tslib_1.__param(0, (0, graphql_1.Parent)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ConversationResolver.prototype, "pinnedMessages", null);
tslib_1.__decorate([
    (0, graphql_1.ResolveField)('pinnedMessagesCount', () => Number),
    tslib_1.__param(0, (0, graphql_1.Parent)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ConversationResolver.prototype, "pinnedMessagesCount", null);
ConversationResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(() => ChatConversation_entity_1.ChatConversation),
    tslib_1.__metadata("design:paramtypes", [conversation_logic_1.ConversationLogic,
        message_dataloader_1.ChatMessageDataLoader])
], ConversationResolver);
exports.ConversationResolver = ConversationResolver;
//# sourceMappingURL=conversation.resolver.js.map
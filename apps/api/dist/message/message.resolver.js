"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RichMessageContentResolver = exports.MessageResolver = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const mongodb_1 = require("mongodb");
const message_entity_1 = require("./models/message.entity");
const message_dto_1 = require("./models/message.dto");
const message_logic_1 = require("./message.logic");
const GqlAuthGuard_1 = require("../authentication/GqlAuthGuard");
const common_1 = require("@nestjs/common");
const jwt_strategy_1 = require("../authentication/jwt.strategy");
const safeguarding_service_1 = require("../safeguarding/safeguarding.service");
const message_dataloader_1 = require("./message.dataloader");
let MessageResolver = class MessageResolver {
    constructor(messageLogic, safeguardingService, chatMessageDataLoader) {
        this.messageLogic = messageLogic;
        this.safeguardingService = safeguardingService;
        this.chatMessageDataLoader = chatMessageDataLoader;
    }
    async resolveReference(reference) {
        return this.chatMessageDataLoader.load(reference.id);
    }
    async sendConversationMessage(messageDto, authenticatedUser) {
        return await this.messageLogic.create(messageDto, authenticatedUser);
    }
    async getMessagesForChatConversation(getMessageDto, authenticatedUser) {
        const result = await this.messageLogic.getChatConversationMessages(getMessageDto, authenticatedUser);
        return result.messages;
    }
    async getChatConversationMessages(getMessageDto, authenticatedUser) {
        return await this.messageLogic.getChatConversationMessages(getMessageDto, authenticatedUser);
    }
    async deleteConversationMessage(deleteMessageDto, authenticatedUser) {
        return await this.messageLogic.delete(deleteMessageDto, authenticatedUser);
    }
    async resolveConversationMessage(resolveMessageDto, authenticatedUser) {
        return await this.messageLogic.resolve(resolveMessageDto, authenticatedUser);
    }
    async unresolveConversationMessage(resolveMessageDto, authenticatedUser) {
        return await this.messageLogic.unresolve(resolveMessageDto, authenticatedUser);
    }
    async likeConversationMessage(likeMessageDto, authenticatedUser) {
        return await this.messageLogic.like(likeMessageDto, authenticatedUser);
    }
    async unlikeConversationMessage(likeMessageDto, authenticatedUser) {
        return await this.messageLogic.unlike(likeMessageDto, authenticatedUser);
    }
    async addReactionToMessage(reactionDto, authenticatedUser) {
        return this.messageLogic.addReactionToMessage(reactionDto, authenticatedUser);
    }
    async removeReactionFromMessage(reactionDto, authenticatedUser) {
        return this.messageLogic.removeReactionFromMessage(reactionDto, authenticatedUser);
    }
    async updateTagsOfMessage(tagsDto, authenticatedUser) {
        return await this.messageLogic.updateTags(tagsDto, authenticatedUser);
    }
    text(message) {
        return this.safeguardingService.clean(message.text);
    }
};
tslib_1.__decorate([
    (0, common_1.UseGuards)(GqlAuthGuard_1.GqlAuthGuardForReference),
    (0, graphql_1.ResolveReference)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MessageResolver.prototype, "resolveReference", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => message_entity_1.ChatMessage),
    (0, common_1.UseGuards)(GqlAuthGuard_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('messageDto')),
    tslib_1.__param(1, (0, jwt_strategy_1.AuthenticatedUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [message_dto_1.MessageDto, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MessageResolver.prototype, "sendConversationMessage", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [message_entity_1.ChatMessage], {
        deprecationReason: 'This query has now been deprecated, please use getChatConversationMessages',
    }),
    (0, common_1.UseGuards)(GqlAuthGuard_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('getMessageDto')),
    tslib_1.__param(1, (0, jwt_strategy_1.AuthenticatedUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [message_dto_1.GetMessageDto, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MessageResolver.prototype, "getMessagesForChatConversation", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => message_entity_1.PaginatedChatMessages),
    (0, common_1.UseGuards)(GqlAuthGuard_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('getMessageDto')),
    tslib_1.__param(1, (0, jwt_strategy_1.AuthenticatedUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [message_dto_1.GetMessageDto, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MessageResolver.prototype, "getChatConversationMessages", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => message_entity_1.ChatMessage),
    (0, common_1.UseGuards)(GqlAuthGuard_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('deleteMessageDto')),
    tslib_1.__param(1, (0, jwt_strategy_1.AuthenticatedUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [message_dto_1.DeleteMessageDto, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MessageResolver.prototype, "deleteConversationMessage", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => message_entity_1.ChatMessage),
    (0, common_1.UseGuards)(GqlAuthGuard_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('resolveMessageDto')),
    tslib_1.__param(1, (0, jwt_strategy_1.AuthenticatedUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [message_dto_1.ResolveMessageDto, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MessageResolver.prototype, "resolveConversationMessage", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => message_entity_1.ChatMessage),
    (0, common_1.UseGuards)(GqlAuthGuard_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('resolveMessageDto')),
    tslib_1.__param(1, (0, jwt_strategy_1.AuthenticatedUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [message_dto_1.ResolveMessageDto, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MessageResolver.prototype, "unresolveConversationMessage", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => message_entity_1.ChatMessage),
    (0, common_1.UseGuards)(GqlAuthGuard_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('likeMessageDto')),
    tslib_1.__param(1, (0, jwt_strategy_1.AuthenticatedUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [message_dto_1.LikeMessageDto, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MessageResolver.prototype, "likeConversationMessage", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => message_entity_1.ChatMessage),
    (0, common_1.UseGuards)(GqlAuthGuard_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('likeMessageDto')),
    tslib_1.__param(1, (0, jwt_strategy_1.AuthenticatedUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [message_dto_1.LikeMessageDto, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MessageResolver.prototype, "unlikeConversationMessage", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => message_entity_1.ChatMessage),
    (0, common_1.UseGuards)(GqlAuthGuard_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('reactionDto')),
    tslib_1.__param(1, (0, jwt_strategy_1.AuthenticatedUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [message_dto_1.ReactionDto, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MessageResolver.prototype, "addReactionToMessage", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => message_entity_1.ChatMessage),
    (0, common_1.UseGuards)(GqlAuthGuard_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('reactionDto')),
    tslib_1.__param(1, (0, jwt_strategy_1.AuthenticatedUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [message_dto_1.ReactionDto, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MessageResolver.prototype, "removeReactionFromMessage", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => message_entity_1.ChatMessage),
    (0, common_1.UseGuards)(GqlAuthGuard_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('tagsDto')),
    tslib_1.__param(1, (0, jwt_strategy_1.AuthenticatedUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [message_dto_1.TagsDto, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MessageResolver.prototype, "updateTagsOfMessage", null);
tslib_1.__decorate([
    (0, graphql_1.ResolveField)(),
    tslib_1.__param(0, (0, graphql_1.Parent)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [message_entity_1.ChatMessage]),
    tslib_1.__metadata("design:returntype", String)
], MessageResolver.prototype, "text", null);
MessageResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(() => message_entity_1.ChatMessage),
    tslib_1.__metadata("design:paramtypes", [message_logic_1.MessageLogic,
        safeguarding_service_1.SafeguardingService,
        message_dataloader_1.ChatMessageDataLoader])
], MessageResolver);
exports.MessageResolver = MessageResolver;
let RichMessageContentResolver = class RichMessageContentResolver {
    constructor(chatMessageDataLoader, messageLogic) {
        this.chatMessageDataLoader = chatMessageDataLoader;
        this.messageLogic = messageLogic;
    }
    async getReplyMessage(richMessageContent) {
        var _a;
        const messageId = (_a = richMessageContent.reply) === null || _a === void 0 ? void 0 : _a.id;
        if (!messageId)
            return undefined;
        return await this.chatMessageDataLoader.load(messageId);
    }
    async addVote(chatMessageId, option, authenticatedUser) {
        var _a;
        const response = await this.messageLogic.addVote(chatMessageId, option, authenticatedUser);
        return (_a = response.richContent) === null || _a === void 0 ? void 0 : _a.poll;
    }
    async removeVote(chatMessageId, option, authenticatedUser) {
        var _a;
        const response = await this.messageLogic.removeVote(chatMessageId, option, authenticatedUser);
        return (_a = response.richContent) === null || _a === void 0 ? void 0 : _a.poll;
    }
};
tslib_1.__decorate([
    (0, graphql_1.ResolveField)('reply', () => message_entity_1.ChatMessage, { nullable: true }),
    tslib_1.__param(0, (0, graphql_1.Parent)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [message_entity_1.RichMessageContent]),
    tslib_1.__metadata("design:returntype", Promise)
], RichMessageContentResolver.prototype, "getReplyMessage", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => message_entity_1.Poll),
    (0, common_1.UseGuards)(GqlAuthGuard_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('chatMessageId')),
    tslib_1.__param(1, (0, graphql_1.Args)('option')),
    tslib_1.__param(2, (0, jwt_strategy_1.AuthenticatedUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [mongodb_1.ObjectId, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RichMessageContentResolver.prototype, "addVote", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => message_entity_1.Poll),
    (0, common_1.UseGuards)(GqlAuthGuard_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('chatMessageId')),
    tslib_1.__param(1, (0, graphql_1.Args)('option')),
    tslib_1.__param(2, (0, jwt_strategy_1.AuthenticatedUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [mongodb_1.ObjectId, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RichMessageContentResolver.prototype, "removeVote", null);
RichMessageContentResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(() => message_entity_1.RichMessageContent),
    tslib_1.__metadata("design:paramtypes", [message_dataloader_1.ChatMessageDataLoader,
        message_logic_1.MessageLogic])
], RichMessageContentResolver);
exports.RichMessageContentResolver = RichMessageContentResolver;
//# sourceMappingURL=message.resolver.js.map
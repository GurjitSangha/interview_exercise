"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationInboxResolver = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const GqlAuthGuard_1 = require("../authentication/GqlAuthGuard");
const jwt_strategy_1 = require("../authentication/jwt.strategy");
const conversation_logic_1 = require("../conversation/conversation.logic");
const ChatConversation_entity_1 = require("../conversation/models/ChatConversation.entity");
const conversation_inbox_entity_1 = require("./models/conversation-inbox.entity");
let ConversationInboxResolver = class ConversationInboxResolver {
    constructor(conversationLogic) {
        this.conversationLogic = conversationLogic;
    }
    async conversations(user, conversationInbox) {
        const { contexts } = conversationInbox;
        return this.conversationLogic.getConversationsForInbox(user, contexts);
    }
    /**
     * This method is here so that the schema picks up the ConversationInbox type
     * Without it, we do not get the auto generated types in the schema file
     *
     * @deprecated
     */
    conversationInboxDoNotUse() {
        return [];
    }
};
tslib_1.__decorate([
    (0, common_1.UseGuards)(GqlAuthGuard_1.GqlAuthGuard),
    (0, graphql_1.ResolveField)(() => [ChatConversation_entity_1.ChatConversation]),
    tslib_1.__param(0, (0, jwt_strategy_1.AuthenticatedUser)()),
    tslib_1.__param(1, (0, graphql_1.Parent)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, conversation_inbox_entity_1.ConversationInbox]),
    tslib_1.__metadata("design:returntype", Promise)
], ConversationInboxResolver.prototype, "conversations", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [conversation_inbox_entity_1.ConversationInbox], {
        deprecationReason: 'Do not use query. See implementation for more details.',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Array)
], ConversationInboxResolver.prototype, "conversationInboxDoNotUse", null);
ConversationInboxResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(() => conversation_inbox_entity_1.ConversationInbox),
    tslib_1.__metadata("design:paramtypes", [conversation_logic_1.ConversationLogic])
], ConversationInboxResolver);
exports.ConversationInboxResolver = ConversationInboxResolver;
//# sourceMappingURL=conversation-inbox.resolver.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationInbox = void 0;
const tslib_1 = require("tslib");
const openapi = require("@nestjs/swagger");
const eager_import_0 = require("../../conversation/models/ContextSchema.dto");
const eager_import_1 = require("../../conversation/models/ChatConversation.entity");
const graphql_1 = require("@nestjs/graphql");
const ChatConversation_entity_1 = require("../../conversation/models/ChatConversation.entity");
const ContextSchema_dto_1 = require("../../conversation/models/ContextSchema.dto");
let ConversationInbox = class ConversationInbox {
    static _GRAPHQL_METADATA_FACTORY() {
        return { contexts: { type: () => [require("../../conversation/models/ContextSchema.dto").Context] }, conversations: { type: () => [require("../../conversation/models/ChatConversation.entity").ChatConversation] } };
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { contexts: { required: true, type: () => [require("../../conversation/models/ContextSchema.dto").Context] }, conversations: { required: true, type: () => [require("../../conversation/models/ChatConversation.entity").ChatConversation] } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [ContextSchema_dto_1.Context], {
        description: 'The contexts the conversations on this entity belong to. We should not try to resolve this from the FE as this should be set explicitly on the specific inbox resolvers.',
    }),
    tslib_1.__metadata("design:type", Array)
], ConversationInbox.prototype, "contexts", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [ChatConversation_entity_1.ChatConversation]),
    tslib_1.__metadata("design:type", Array)
], ConversationInbox.prototype, "conversations", void 0);
ConversationInbox = tslib_1.__decorate([
    (0, graphql_1.ObjectType)(),
    (0, graphql_1.Directive)('@key(fields: "contexts { id }")')
], ConversationInbox);
exports.ConversationInbox = ConversationInbox;
//# sourceMappingURL=conversation-inbox.entity.js.map
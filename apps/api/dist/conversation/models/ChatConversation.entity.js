"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatConversation = void 0;
const tslib_1 = require("tslib");
const openapi = require("@nestjs/swagger");
const eager_import_0 = require("../../message/models/message.entity");
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const message_entity_1 = require("../../message/models/message.entity");
let ChatConversation = class ChatConversation {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, unreadMessageCount: { nullable: true, type: () => Number }, lastMessage: { nullable: true, type: () => require("../../message/models/message.entity").ChatMessage } };
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, unreadMessageCount: { required: false, type: () => Number }, lastMessage: { required: false, type: () => require("../../message/models/message.entity").ChatMessage } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], ChatConversation.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Number)
], ChatConversation.prototype, "unreadMessageCount", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => message_entity_1.ChatMessage),
    tslib_1.__metadata("design:type", message_entity_1.ChatMessage)
], ChatConversation.prototype, "lastMessage", void 0);
ChatConversation = tslib_1.__decorate([
    (0, graphql_1.ObjectType)(),
    (0, graphql_1.Directive)('@key(fields: "id")')
], ChatConversation);
exports.ChatConversation = ChatConversation;
//# sourceMappingURL=ChatConversation.entity.js.map
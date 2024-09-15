"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatConversationSchema = exports.chatConversationToObject = exports.ChatConversationModel = void 0;
const tslib_1 = require("tslib");
const eager_import_0 = require("./Permission.dto");
const eager_import_1 = require("./ContextSchema.dto");
const eager_import_2 = require("bson");
const eager_import_3 = require("./CreateChatConversation.dto");
const mongodb_1 = require("mongodb");
const mongoose_1 = require("@nestjs/mongoose");
const ContextSchema_dto_1 = require("./ContextSchema.dto");
let ChatConversationModel = class ChatConversationModel {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String, description: "No props here it's added to all documents but we need this\nto be able to match the return type" }, permissions: { type: () => [require("./Permission.dto").Permission] }, product: { type: () => require("./ContextSchema.dto").Product }, context: { type: () => [require("./ContextSchema.dto").ContextSchema] }, memberIds: { type: () => [String] }, blockedMemberIds: { type: () => [String] }, lastMessageId: { type: () => require("bson").ObjectId }, pinnedMessages: { nullable: true, type: () => [require("bson").ObjectId] }, tags: { nullable: true, type: () => [require("./CreateChatConversation.dto").Tag] } };
    }
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        // Getter and setter to work around https://jira.mongodb.org/browse/NODE-1645, without resorting to unsafe { checkKeys: false}
        set: (permissions) => JSON.stringify(permissions),
        get: (permissions) => JSON.parse(permissions),
    }),
    tslib_1.__metadata("design:type", Array)
], ChatConversationModel.prototype, "permissions", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        enum: ContextSchema_dto_1.Product,
    }),
    tslib_1.__metadata("design:type", String)
], ChatConversationModel.prototype, "product", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)([ContextSchema_dto_1.ContextSchema]),
    tslib_1.__metadata("design:type", Array)
], ChatConversationModel.prototype, "context", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    tslib_1.__metadata("design:type", Array)
], ChatConversationModel.prototype, "memberIds", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    tslib_1.__metadata("design:type", Array)
], ChatConversationModel.prototype, "blockedMemberIds", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], ChatConversationModel.prototype, "lastMessageId", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [mongodb_1.ObjectID], required: false }),
    tslib_1.__metadata("design:type", Array)
], ChatConversationModel.prototype, "pinnedMessages", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        type: [{ id: { type: String }, type: { type: String } }],
        required: false,
        default: [],
    }),
    tslib_1.__metadata("design:type", Array)
], ChatConversationModel.prototype, "tags", void 0);
ChatConversationModel = tslib_1.__decorate([
    (0, mongoose_1.Schema)({ collection: 'chatconverationmodels' }) // keeping the collection's old name in the DB
], ChatConversationModel);
exports.ChatConversationModel = ChatConversationModel;
function chatConversationToObject(doc) {
    if (!doc) {
        throw new Error('No Conversation document found');
    }
    const parsed = doc.toObject({
        getters: true,
        virtuals: true,
        versionKey: false,
    });
    return parsed;
}
exports.chatConversationToObject = chatConversationToObject;
exports.ChatConversationSchema = mongoose_1.SchemaFactory.createForClass(ChatConversationModel);
exports.ChatConversationSchema.index({ memberIds: 1 });
exports.ChatConversationSchema.index({ context: 1 });
//# sourceMappingURL=conversation.model.js.map
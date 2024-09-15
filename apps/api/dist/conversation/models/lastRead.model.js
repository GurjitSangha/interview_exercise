"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastReadDocumentToObject = exports.LastReadSchema = exports.LastReadModel = void 0;
const tslib_1 = require("tslib");
const eager_import_0 = require("bson");
const mongodb_1 = require("mongodb");
const mongoose_1 = require("@nestjs/mongoose");
/* Captures the last message that a user read
 * in a conversation */
let LastReadModel = class LastReadModel {
    static _GRAPHQL_METADATA_FACTORY() {
        return { userId: { type: () => String }, conversationId: { type: () => String }, messageId: { type: () => require("bson").ObjectId } };
    }
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], LastReadModel.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], LastReadModel.prototype, "conversationId", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], LastReadModel.prototype, "messageId", void 0);
LastReadModel = tslib_1.__decorate([
    (0, mongoose_1.Schema)({ timestamps: { createdAt: true, updatedAt: false } })
], LastReadModel);
exports.LastReadModel = LastReadModel;
exports.LastReadSchema = mongoose_1.SchemaFactory.createForClass(LastReadModel);
exports.LastReadSchema.index({ userId: 1, conversationId: 1 }, { unique: true });
function lastReadDocumentToObject(doc) {
    const parsedLastReadObject = doc.toObject({
        getters: true,
        virtuals: true,
        versionKey: false,
    });
    return parsedLastReadObject;
}
exports.lastReadDocumentToObject = lastReadDocumentToObject;
//# sourceMappingURL=lastRead.model.js.map
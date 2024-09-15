"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBlockSchema = exports.UserBlockModel = void 0;
const tslib_1 = require("tslib");
const eager_import_0 = require("bson");
const mongodb_1 = require("mongodb");
const mongoose_1 = require("@nestjs/mongoose");
let UserBlockModel = class UserBlockModel {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, blockedUserId: { type: () => require("bson").ObjectId }, blockingUserId: { type: () => require("bson").ObjectId }, scope: { type: () => String }, scopeId: { type: () => require("bson").ObjectId } };
    }
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], UserBlockModel.prototype, "blockedUserId", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], UserBlockModel.prototype, "blockingUserId", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], UserBlockModel.prototype, "scope", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], UserBlockModel.prototype, "scopeId", void 0);
UserBlockModel = tslib_1.__decorate([
    (0, mongoose_1.Schema)({ collection: 'user_block_model' })
], UserBlockModel);
exports.UserBlockModel = UserBlockModel;
exports.UserBlockSchema = mongoose_1.SchemaFactory.createForClass(UserBlockModel);
//# sourceMappingURL=user-blocks.model.js.map
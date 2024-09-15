"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LastRead = void 0;
const tslib_1 = require("tslib");
const openapi = require("@nestjs/swagger");
const eager_import_0 = require("bson");
const mongodb_1 = require("mongodb");
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
let LastRead = class LastRead {
    static _GRAPHQL_METADATA_FACTORY() {
        return { userId: { type: () => String }, conversationId: { type: () => String }, messageId: { type: () => require("bson").ObjectId } };
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => String }, conversationId: { required: true, type: () => String }, messageId: { required: true, type: () => require("bson").ObjectId } };
    }
};
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], LastRead.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], LastRead.prototype, "conversationId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], LastRead.prototype, "messageId", void 0);
LastRead = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], LastRead);
exports.LastRead = LastRead;
//# sourceMappingURL=LastRead.entity.js.map
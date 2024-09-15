"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
const tslib_1 = require("tslib");
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("@nestjs/mongoose");
const permissions_model_1 = require("../../permissions/models/permissions.model");
class Permission {
    static _OPENAPI_METADATA_FACTORY() {
        return { action: { required: true, enum: require("../../permissions/models/permissions.model").Action }, subject: { required: true, enum: require("../../permissions/models/permissions.model").Subject }, conditions: { required: false, type: () => require("../../permissions/models/permissions.model").Conditions } };
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        enum: permissions_model_1.Action,
    }),
    (0, mongoose_1.Prop)({
        required: true,
        enum: permissions_model_1.Action,
    }),
    tslib_1.__metadata("design:type", String)
], Permission.prototype, "action", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        enum: permissions_model_1.Subject,
    }),
    (0, mongoose_1.Prop)({
        required: true,
        enum: permissions_model_1.Subject,
    }),
    tslib_1.__metadata("design:type", String)
], Permission.prototype, "subject", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: permissions_model_1.Conditions,
    }),
    (0, mongoose_1.Prop)({ type: permissions_model_1.Conditions, required: false }),
    tslib_1.__metadata("design:type", permissions_model_1.Conditions)
], Permission.prototype, "conditions", void 0);
exports.Permission = Permission;
//# sourceMappingURL=Permission.dto.js.map
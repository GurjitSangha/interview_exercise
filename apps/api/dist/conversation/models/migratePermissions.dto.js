"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigratePermissionsDTO = void 0;
const tslib_1 = require("tslib");
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const ContextSchema_dto_1 = require("./ContextSchema.dto");
class MigratePermissionsDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { permissions: { required: true, type: () => [require("./Permission.dto").Permission] }, product: { required: true, enum: require("./ContextSchema.dto").Product }, conversationIds: { required: true, type: () => [String] } };
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'Permissions Body',
    }),
    tslib_1.__metadata("design:type", Array)
], MigratePermissionsDTO.prototype, "permissions", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        enum: ['community'],
        description: 'Target Product - community/virtualEvent',
    }),
    tslib_1.__metadata("design:type", String)
], MigratePermissionsDTO.prototype, "product", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'conversationIds list for those permission has to be updated',
    }),
    tslib_1.__metadata("design:type", Array)
], MigratePermissionsDTO.prototype, "conversationIds", void 0);
exports.MigratePermissionsDTO = MigratePermissionsDTO;
//# sourceMappingURL=migratePermissions.dto.js.map
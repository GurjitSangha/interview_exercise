"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockUserRequestDTO = void 0;
const tslib_1 = require("tslib");
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class BlockUserRequestDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { blocked_user: { required: true, type: () => String }, blocker: { required: true, type: () => String }, set_blocked: { required: true, type: () => Boolean }, blocker_type: { required: true, type: () => String } };
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'Id of user which is blocked',
    }),
    tslib_1.__metadata("design:type", String)
], BlockUserRequestDTO.prototype, "blocked_user", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'Id of target user against which user is blocked',
    }),
    tslib_1.__metadata("design:type", String)
], BlockUserRequestDTO.prototype, "blocker", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'Event action type. True means block, false means unblock',
    }),
    tslib_1.__metadata("design:type", Boolean)
], BlockUserRequestDTO.prototype, "set_blocked", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        enum: ['user'],
        description: 'Entity whose access is blocked. Can be user only',
    }),
    tslib_1.__metadata("design:type", String)
], BlockUserRequestDTO.prototype, "blocker_type", void 0);
exports.BlockUserRequestDTO = BlockUserRequestDTO;
//# sourceMappingURL=blockUserRequest.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockUserDTO = void 0;
const tslib_1 = require("tslib");
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class BlockUserDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { conversationIds: { required: true, type: () => [String] }, memberId: { required: true, type: () => String } };
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'Ids of the conversations user has joined',
    }),
    tslib_1.__metadata("design:type", Array)
], BlockUserDTO.prototype, "conversationIds", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'Id of the user',
    }),
    tslib_1.__metadata("design:type", String)
], BlockUserDTO.prototype, "memberId", void 0);
exports.BlockUserDTO = BlockUserDTO;
//# sourceMappingURL=blockUser.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMemberDTO = void 0;
const tslib_1 = require("tslib");
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class AddMemberDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => String } };
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        additionalProperties: false,
    }),
    tslib_1.__metadata("design:type", String)
], AddMemberDTO.prototype, "userId", void 0);
exports.AddMemberDTO = AddMemberDTO;
//# sourceMappingURL=AddMember.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LastMessageInput = void 0;
const tslib_1 = require("tslib");
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class LastMessageInput {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => String }, conversationIds: { required: false, type: () => [String] } };
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'Id of the user for whom lastMessageId is requested',
    }),
    tslib_1.__metadata("design:type", String)
], LastMessageInput.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of conversationIds for whom the lastMessageId is to be computed',
    }),
    tslib_1.__metadata("design:type", Array)
], LastMessageInput.prototype, "conversationIds", void 0);
exports.LastMessageInput = LastMessageInput;
//# sourceMappingURL=lastMessage.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnreadCountInput = void 0;
const tslib_1 = require("tslib");
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class UnreadCountInput {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => String }, conversationIds: { required: false, type: () => [String] } };
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'Id of the user for whom unread message count is requested',
    }),
    tslib_1.__metadata("design:type", String)
], UnreadCountInput.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of conversationIds for whom the unread count is to be computed',
    }),
    tslib_1.__metadata("design:type", Array)
], UnreadCountInput.prototype, "conversationIds", void 0);
exports.UnreadCountInput = UnreadCountInput;
//# sourceMappingURL=unreadCount.dto.js.map
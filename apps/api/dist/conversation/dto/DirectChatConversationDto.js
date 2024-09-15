"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectChatConversationDto = void 0;
const tslib_1 = require("tslib");
const ContextSchema_dto_1 = require("./../models/ContextSchema.dto");
const swagger_1 = require("@nestjs/swagger");
const ContextSchema_dto_2 = require("../models/ContextSchema.dto");
class DirectChatConversationDto {
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], DirectChatConversationDto.prototype, "product", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: [ContextSchema_dto_1.Context] }),
    tslib_1.__metadata("design:type", Array)
], DirectChatConversationDto.prototype, "context", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], DirectChatConversationDto.prototype, "userToConverseWith", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], DirectChatConversationDto.prototype, "currentUserId", void 0);
exports.DirectChatConversationDto = DirectChatConversationDto;
//# sourceMappingURL=DirectChatConversationDto.js.map
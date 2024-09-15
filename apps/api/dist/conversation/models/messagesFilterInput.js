"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesFilterInput = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class MessagesFilterInput {
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'List of conversationIds for whom the messages are to be fetched',
    }),
    tslib_1.__metadata("design:type", Array)
], MessagesFilterInput.prototype, "conversationIds", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'start date for the messages to be filtered',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], MessagesFilterInput.prototype, "startDate", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'end date for the messages to be filtered',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], MessagesFilterInput.prototype, "endDate", void 0);
exports.MessagesFilterInput = MessagesFilterInput;
//# sourceMappingURL=messagesFilterInput.js.map
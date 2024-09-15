"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateChatConversationDto = exports.Tag = exports.TagType = void 0;
const tslib_1 = require("tslib");
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const Permission_dto_1 = require("./Permission.dto");
const ContextSchema_dto_1 = require("./ContextSchema.dto");
var TagType;
(function (TagType) {
    TagType["subTopic"] = "subTopic";
})(TagType = exports.TagType || (exports.TagType = {}));
class Tag {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, type: { required: true, type: () => String, enum: require("./CreateChatConversation.dto").TagType } };
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Tag.prototype, "id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: TagType }),
    tslib_1.__metadata("design:type", String)
], Tag.prototype, "type", void 0);
exports.Tag = Tag;
class CreateChatConversationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { product: { required: true, enum: require("./ContextSchema.dto").Product }, context: { required: true, type: () => [require("./ContextSchema.dto").Context] }, permissions: { required: false, type: () => [require("./Permission.dto").Permission] }, tags: { required: false, type: () => [require("./CreateChatConversation.dto").Tag] }, memberIds: { required: false, type: () => [String] }, blockedMemberIds: { required: false, type: () => [String] } };
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], CreateChatConversationDto.prototype, "product", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: [ContextSchema_dto_1.Context] }),
    tslib_1.__metadata("design:type", Array)
], CreateChatConversationDto.prototype, "context", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: [Permission_dto_1.Permission], required: false, default: [] }),
    tslib_1.__metadata("design:type", Array)
], CreateChatConversationDto.prototype, "permissions", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: [Tag], required: false }),
    tslib_1.__metadata("design:type", Array)
], CreateChatConversationDto.prototype, "tags", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: [String], required: false }),
    tslib_1.__metadata("design:type", Array)
], CreateChatConversationDto.prototype, "memberIds", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: [String], required: false }),
    tslib_1.__metadata("design:type", Array)
], CreateChatConversationDto.prototype, "blockedMemberIds", void 0);
exports.CreateChatConversationDto = CreateChatConversationDto;
//# sourceMappingURL=CreateChatConversation.dto.js.map
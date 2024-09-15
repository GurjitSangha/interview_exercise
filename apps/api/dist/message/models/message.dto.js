"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsDto = exports.TagDto = exports.TagType = exports.ReactionDto = exports.LikeMessageDto = exports.ResolveMessageDto = exports.DeleteMessageDto = exports.GetMessageDto = exports.MessageDto = exports.RichContentDto = exports.PollDto = exports.PollOptionDto = exports.AttachmentDto = exports.AttachmentType = exports.ImageDto = exports.GifDto = exports.ReplyMessageDto = exports.GifType = void 0;
const tslib_1 = require("tslib");
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const mongodb_1 = require("mongodb");
var GifType;
(function (GifType) {
    GifType["Gif"] = "gif";
    GifType["Sticker"] = "sticker";
})(GifType = exports.GifType || (exports.GifType = {}));
(0, graphql_1.registerEnumType)(GifType, {
    name: 'GifType',
});
let ReplyMessageDto = class ReplyMessageDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => require("bson").ObjectId } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], ReplyMessageDto.prototype, "id", void 0);
ReplyMessageDto = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], ReplyMessageDto);
exports.ReplyMessageDto = ReplyMessageDto;
let GifDto = class GifDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, type: { required: true, enum: require("./message.dto").GifType }, width: { required: true, type: () => Number }, height: { required: true, type: () => Number }, aspectRatio: { required: true, type: () => Number } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], GifDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => GifType),
    tslib_1.__metadata("design:type", String)
], GifDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Number)
], GifDto.prototype, "width", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Number)
], GifDto.prototype, "height", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    tslib_1.__metadata("design:type", Number)
], GifDto.prototype, "aspectRatio", void 0);
GifDto = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], GifDto);
exports.GifDto = GifDto;
let ImageDto = class ImageDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { url: { required: true, type: () => String } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], ImageDto.prototype, "url", void 0);
ImageDto = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], ImageDto);
exports.ImageDto = ImageDto;
var AttachmentType;
(function (AttachmentType) {
    AttachmentType["PDF"] = "pdf";
})(AttachmentType = exports.AttachmentType || (exports.AttachmentType = {}));
(0, graphql_1.registerEnumType)(AttachmentType, {
    name: 'AttachmentType',
});
let AttachmentDto = class AttachmentDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { link: { required: true, type: () => String }, type: { required: true, type: () => String, enum: require("./message.dto").AttachmentType }, size: { required: false, type: () => String }, fileName: { required: false, type: () => String } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], AttachmentDto.prototype, "link", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => AttachmentType),
    tslib_1.__metadata("design:type", String)
], AttachmentDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    tslib_1.__metadata("design:type", String)
], AttachmentDto.prototype, "size", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    tslib_1.__metadata("design:type", String)
], AttachmentDto.prototype, "fileName", void 0);
AttachmentDto = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], AttachmentDto);
exports.AttachmentDto = AttachmentDto;
let PollOptionDto = class PollOptionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { option: { required: true, type: () => String }, votes: { required: false } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], PollOptionDto.prototype, "option", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [mongodb_1.ObjectID], { defaultValue: [] }),
    tslib_1.__metadata("design:type", Set)
], PollOptionDto.prototype, "votes", void 0);
PollOptionDto = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], PollOptionDto);
exports.PollOptionDto = PollOptionDto;
let PollDto = class PollDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { question: { required: true, type: () => String }, options: { required: true, type: () => [require("./message.dto").PollOptionDto] }, allowMultipleAnswers: { required: true, type: () => Boolean } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    tslib_1.__metadata("design:type", String)
], PollDto.prototype, "question", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [PollOptionDto]),
    tslib_1.__metadata("design:type", Array)
], PollDto.prototype, "options", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Boolean),
    tslib_1.__metadata("design:type", Boolean)
], PollDto.prototype, "allowMultipleAnswers", void 0);
PollDto = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], PollDto);
exports.PollDto = PollDto;
let RichContentDto = class RichContentDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { reply: { required: false, type: () => require("./message.dto").ReplyMessageDto }, giphy: { required: false, type: () => require("./message.dto").GifDto }, images: { required: false, type: () => [require("./message.dto").ImageDto] }, attachments: { required: false, type: () => [require("./message.dto").AttachmentDto] }, poll: { required: false, type: () => require("./message.dto").PollDto } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => ReplyMessageDto, { nullable: true }),
    tslib_1.__metadata("design:type", ReplyMessageDto)
], RichContentDto.prototype, "reply", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => GifDto, { nullable: true }),
    tslib_1.__metadata("design:type", GifDto)
], RichContentDto.prototype, "giphy", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [ImageDto], { nullable: true }),
    tslib_1.__metadata("design:type", Array)
], RichContentDto.prototype, "images", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [AttachmentDto], { nullable: true }),
    tslib_1.__metadata("design:type", Array)
], RichContentDto.prototype, "attachments", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => PollDto, { nullable: true }),
    tslib_1.__metadata("design:type", PollDto)
], RichContentDto.prototype, "poll", void 0);
RichContentDto = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], RichContentDto);
exports.RichContentDto = RichContentDto;
let MessageDto = class MessageDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { text: { required: true, type: () => String }, conversationId: { required: true, type: () => require("bson").ObjectId }, richContent: { required: false, type: () => require("./message.dto").RichContentDto } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], MessageDto.prototype, "text", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], MessageDto.prototype, "conversationId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => RichContentDto, { nullable: true }),
    tslib_1.__metadata("design:type", RichContentDto)
], MessageDto.prototype, "richContent", void 0);
MessageDto = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], MessageDto);
exports.MessageDto = MessageDto;
// TODO Min - Max on limit
let GetMessageDto = class GetMessageDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { conversationId: { required: true, type: () => require("bson").ObjectId }, offsetId: { required: false, type: () => require("bson").ObjectId }, limit: { required: true, type: () => Number } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], GetMessageDto.prototype, "conversationId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], GetMessageDto.prototype, "offsetId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ defaultValue: 40 }),
    tslib_1.__metadata("design:type", Number)
], GetMessageDto.prototype, "limit", void 0);
GetMessageDto = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], GetMessageDto);
exports.GetMessageDto = GetMessageDto;
let DeleteMessageDto = class DeleteMessageDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { conversationId: { required: true, type: () => require("bson").ObjectId }, messageId: { required: true, type: () => require("bson").ObjectId } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], DeleteMessageDto.prototype, "conversationId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], DeleteMessageDto.prototype, "messageId", void 0);
DeleteMessageDto = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], DeleteMessageDto);
exports.DeleteMessageDto = DeleteMessageDto;
let ResolveMessageDto = class ResolveMessageDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { conversationId: { required: true, type: () => require("bson").ObjectId }, messageId: { required: true, type: () => require("bson").ObjectId } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], ResolveMessageDto.prototype, "conversationId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], ResolveMessageDto.prototype, "messageId", void 0);
ResolveMessageDto = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], ResolveMessageDto);
exports.ResolveMessageDto = ResolveMessageDto;
let LikeMessageDto = class LikeMessageDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => require("bson").ObjectId }, messageId: { required: true, type: () => require("bson").ObjectId }, conversationId: { required: true, type: () => require("bson").ObjectId } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => mongodb_1.ObjectID),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], LikeMessageDto.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => mongodb_1.ObjectID),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], LikeMessageDto.prototype, "messageId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => mongodb_1.ObjectID),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], LikeMessageDto.prototype, "conversationId", void 0);
LikeMessageDto = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], LikeMessageDto);
exports.LikeMessageDto = LikeMessageDto;
let ReactionDto = class ReactionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { reaction: { required: true, type: () => String }, reactionUnicode: { required: true, type: () => String }, messageId: { required: true, type: () => require("bson").ObjectId }, conversationId: { required: true, type: () => require("bson").ObjectId } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    tslib_1.__metadata("design:type", String)
], ReactionDto.prototype, "reaction", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String),
    tslib_1.__metadata("design:type", String)
], ReactionDto.prototype, "reactionUnicode", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => mongodb_1.ObjectID),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], ReactionDto.prototype, "messageId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => mongodb_1.ObjectID),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], ReactionDto.prototype, "conversationId", void 0);
ReactionDto = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], ReactionDto);
exports.ReactionDto = ReactionDto;
// Can these be shared with the conversation tags?
var TagType;
(function (TagType) {
    TagType["chat"] = "chat";
})(TagType = exports.TagType || (exports.TagType = {}));
(0, graphql_1.registerEnumType)(TagType, {
    name: 'TagType',
});
let TagDto = class TagDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, type: { required: true, type: () => String, enum: require("./message.dto").TagType } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], TagDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => TagType),
    tslib_1.__metadata("design:type", String)
], TagDto.prototype, "type", void 0);
TagDto = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], TagDto);
exports.TagDto = TagDto;
let TagsDto = class TagsDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { messageId: { required: true, type: () => require("bson").ObjectId }, conversationId: { required: true, type: () => require("bson").ObjectId }, tags: { required: true, type: () => [require("./message.dto").TagDto] } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => mongodb_1.ObjectID),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], TagsDto.prototype, "messageId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => mongodb_1.ObjectID),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], TagsDto.prototype, "conversationId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [TagDto]),
    tslib_1.__metadata("design:type", Array)
], TagsDto.prototype, "tags", void 0);
TagsDto = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], TagsDto);
exports.TagsDto = TagsDto;
//# sourceMappingURL=message.dto.js.map
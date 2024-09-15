"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatMessageToObject = exports.ChatMessageSchema = exports.ChatMessageModel = exports.Tag = exports.Reaction = exports.RichMessageContent = exports.Poll = exports.PollOption = exports.Attachment = exports.Image = exports.Giphy = exports.ReplyMessage = void 0;
const tslib_1 = require("tslib");
const eager_import_0 = require("bson");
const eager_import_1 = require("./message.dto");
const eager_import_2 = require("./message.model");
const mongoose_1 = require("@nestjs/mongoose");
const mongodb_1 = require("mongodb");
const message_dto_1 = require("./message.dto");
const graphql_1 = require("@nestjs/graphql");
let ReplyMessage = class ReplyMessage {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => require("bson").ObjectId } };
    }
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], ReplyMessage.prototype, "id", void 0);
ReplyMessage = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], ReplyMessage);
exports.ReplyMessage = ReplyMessage;
let Giphy = class Giphy {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, type: { type: () => require("./message.dto").GifType }, height: { type: () => Number }, width: { type: () => Number }, aspectRatio: { type: () => Number } };
    }
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Giphy.prototype, "id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        type: message_dto_1.GifType,
    }),
    tslib_1.__metadata("design:type", String)
], Giphy.prototype, "type", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Number)
], Giphy.prototype, "height", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Number)
], Giphy.prototype, "width", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Number)
], Giphy.prototype, "aspectRatio", void 0);
Giphy = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Giphy);
exports.Giphy = Giphy;
let Image = class Image {
    static _GRAPHQL_METADATA_FACTORY() {
        return { url: { type: () => String } };
    }
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Image.prototype, "url", void 0);
Image = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Image);
exports.Image = Image;
let Attachment = class Attachment {
    static _GRAPHQL_METADATA_FACTORY() {
        return { link: { type: () => String }, type: { type: () => require("./message.dto").AttachmentType }, size: { nullable: true, type: () => String }, fileName: { nullable: true, type: () => String } };
    }
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Attachment.prototype, "link", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: message_dto_1.AttachmentType }),
    tslib_1.__metadata("design:type", String)
], Attachment.prototype, "type", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, nullable: true }),
    tslib_1.__metadata("design:type", String)
], Attachment.prototype, "size", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, nullable: true }),
    tslib_1.__metadata("design:type", String)
], Attachment.prototype, "fileName", void 0);
Attachment = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Attachment);
exports.Attachment = Attachment;
let PollOption = class PollOption {
    static _GRAPHQL_METADATA_FACTORY() {
        return { option: { type: () => String }, votes: { nullable: true, type: () => Object } };
    }
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], PollOption.prototype, "option", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [mongodb_1.ObjectID], default: [] }),
    tslib_1.__metadata("design:type", Set)
], PollOption.prototype, "votes", void 0);
PollOption = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], PollOption);
exports.PollOption = PollOption;
let Poll = class Poll {
    static _GRAPHQL_METADATA_FACTORY() {
        return { question: { type: () => String }, options: { type: () => [require("./message.model").PollOption] }, allowMultipleAnswers: { type: () => Boolean } };
    }
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Poll.prototype, "question", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [PollOption] }),
    tslib_1.__metadata("design:type", Array)
], Poll.prototype, "options", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Boolean }),
    tslib_1.__metadata("design:type", Boolean)
], Poll.prototype, "allowMultipleAnswers", void 0);
Poll = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Poll);
exports.Poll = Poll;
let RichMessageContent = class RichMessageContent {
    static _GRAPHQL_METADATA_FACTORY() {
        return { reply: { nullable: true, type: () => require("./message.model").ReplyMessage }, giphy: { nullable: true, type: () => require("./message.model").Giphy }, images: { nullable: true, type: () => [require("./message.model").Image] }, attachments: { nullable: true, type: () => [require("./message.model").Attachment] }, poll: { nullable: true, type: () => require("./message.model").Poll } };
    }
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        type: ReplyMessage,
    }),
    tslib_1.__metadata("design:type", ReplyMessage)
], RichMessageContent.prototype, "reply", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        type: Giphy,
    }),
    tslib_1.__metadata("design:type", Giphy)
], RichMessageContent.prototype, "giphy", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        type: [Image],
    }),
    tslib_1.__metadata("design:type", Array)
], RichMessageContent.prototype, "images", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        type: [Attachment],
    }),
    tslib_1.__metadata("design:type", Array)
], RichMessageContent.prototype, "attachments", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        type: Poll,
    }),
    tslib_1.__metadata("design:type", Poll)
], RichMessageContent.prototype, "poll", void 0);
RichMessageContent = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], RichMessageContent);
exports.RichMessageContent = RichMessageContent;
let Reaction = class Reaction {
    static _GRAPHQL_METADATA_FACTORY() {
        return { reaction: { type: () => String }, reactionUnicode: { type: () => String }, userIds: { type: () => [String] } };
    }
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, unique: true }),
    (0, graphql_1.Field)(() => String, { nullable: false }),
    tslib_1.__metadata("design:type", String)
], Reaction.prototype, "reaction", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, unique: true }),
    (0, graphql_1.Field)(() => String, { nullable: false }),
    tslib_1.__metadata("design:type", String)
], Reaction.prototype, "reactionUnicode", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    (0, graphql_1.Field)(() => [String], { nullable: false }),
    tslib_1.__metadata("design:type", Array)
], Reaction.prototype, "userIds", void 0);
Reaction = tslib_1.__decorate([
    (0, mongoose_1.Schema)(),
    (0, graphql_1.ObjectType)()
], Reaction);
exports.Reaction = Reaction;
let Tag = class Tag {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, type: { type: () => require("./message.dto").TagType } };
    }
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Tag.prototype, "id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        type: message_dto_1.TagType,
    }),
    tslib_1.__metadata("design:type", String)
], Tag.prototype, "type", void 0);
Tag = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Tag);
exports.Tag = Tag;
let ChatMessageModel = class ChatMessageModel {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => require("bson").ObjectId }, text: { type: () => String }, created: { type: () => Date }, senderId: { type: () => require("bson").ObjectId }, conversationId: { type: () => require("bson").ObjectId }, deleted: { type: () => Boolean }, resolved: { type: () => Boolean }, likes: { type: () => [require("bson").ObjectId] }, richContent: { nullable: true, type: () => require("./message.model").RichMessageContent }, reactions: { nullable: true, type: () => [require("./message.model").Reaction] }, tags: { nullable: true, type: () => [require("./message.model").Tag] }, conversation: { type: () => ({ id: { type: () => String } }), description: "All the properties below are virtual properties" }, likesCount: { type: () => Number }, sender: { type: () => ({ id: { type: () => String } }) } };
    }
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], ChatMessageModel.prototype, "text", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true, type: () => Date }),
    tslib_1.__metadata("design:type", Date)
], ChatMessageModel.prototype, "created", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], ChatMessageModel.prototype, "senderId", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true }),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], ChatMessageModel.prototype, "conversationId", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], ChatMessageModel.prototype, "deleted", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        default: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], ChatMessageModel.prototype, "resolved", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Array)
], ChatMessageModel.prototype, "likes", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: RichMessageContent }),
    tslib_1.__metadata("design:type", RichMessageContent)
], ChatMessageModel.prototype, "richContent", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        type: [{ reaction: String, userIds: [String], reactionUnicode: String }],
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Array)
], ChatMessageModel.prototype, "reactions", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        type: [{ id: { type: String }, type: { type: String } }],
        required: false,
        default: [],
    }),
    tslib_1.__metadata("design:type", Array)
], ChatMessageModel.prototype, "tags", void 0);
ChatMessageModel = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], ChatMessageModel);
exports.ChatMessageModel = ChatMessageModel;
exports.ChatMessageSchema = mongoose_1.SchemaFactory.createForClass(ChatMessageModel);
exports.ChatMessageSchema.virtual('conversation').get(function () {
    return { id: String(this.conversationId) };
});
exports.ChatMessageSchema.virtual('likesCount').get(function () {
    return this.likes.length;
});
exports.ChatMessageSchema.virtual('sender').get(function () {
    return { id: String(this.senderId) };
});
exports.ChatMessageSchema.index({ conversationId: 1, created: -1, _id: -1 });
function chatMessageToObject(doc) {
    const parsed = doc.toObject({
        getters: true,
        virtuals: true,
        versionKey: false,
    });
    function maskDeletedMessageText(deleted, text) {
        if (deleted)
            return 'This message has been deleted';
        return text;
    }
    return {
        ...parsed,
        id: new mongodb_1.ObjectID(parsed.id),
        text: maskDeletedMessageText(parsed.deleted, parsed.text),
    };
}
exports.chatMessageToObject = chatMessageToObject;
//# sourceMappingURL=message.model.js.map
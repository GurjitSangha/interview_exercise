"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedChatMessages = exports.SocketChatMessage = exports.ChatMessage = exports.ChatMessageData = exports.RichMessageContent = exports.Tag = exports.Poll = exports.PollOption = exports.Attachment = exports.Image = exports.Giphy = exports.ReplyMessage = void 0;
const tslib_1 = require("tslib");
const openapi = require("@nestjs/swagger");
const eager_import_0 = require("./message.entity");
const eager_import_1 = require("bson");
const eager_import_2 = require("./message.dto");
const eager_import_3 = require("../../conversation/models/ChatConversation.entity");
const eager_import_4 = require("../../user/models/user.model");
const eager_import_5 = require("./message.model");
const graphql_1 = require("@nestjs/graphql");
const mongodb_1 = require("mongodb");
const user_model_1 = require("../../user/models/user.model");
const ChatConversation_entity_1 = require("../../conversation/models/ChatConversation.entity");
const message_dto_1 = require("./message.dto");
const message_model_1 = require("./message.model");
class ReplyMessageSocket {
    static _GRAPHQL_METADATA_FACTORY() {
        return { text: { nullable: true, type: () => String }, created: { nullable: true, type: () => Date }, sender: { nullable: true, type: () => Object }, richContent: { nullable: true, type: () => require("./message.entity").RichMessageContent }, deleted: { nullable: true, type: () => Boolean } };
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { text: { required: false, type: () => String }, created: { required: false, type: () => Date }, sender: { required: false, type: () => Object }, richContent: { required: false, type: () => require("./message.entity").RichMessageContent }, deleted: { required: false, type: () => Boolean } };
    }
}
let ReplyMessage = class ReplyMessage extends ReplyMessageSocket {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => require("bson").ObjectId } };
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => require("bson").ObjectId } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => mongodb_1.ObjectID),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], ReplyMessage.prototype, "id", void 0);
ReplyMessage = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], ReplyMessage);
exports.ReplyMessage = ReplyMessage;
let Giphy = class Giphy {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, type: { type: () => require("./message.dto").GifType }, width: { type: () => Number }, height: { type: () => Number }, aspectRatio: { type: () => Number } };
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, type: { required: true, enum: require("./message.dto").GifType }, width: { required: true, type: () => Number }, height: { required: true, type: () => Number }, aspectRatio: { required: true, type: () => Number } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Giphy.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => message_dto_1.GifType),
    tslib_1.__metadata("design:type", String)
], Giphy.prototype, "type", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Number)
], Giphy.prototype, "width", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Number)
], Giphy.prototype, "height", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    tslib_1.__metadata("design:type", Number)
], Giphy.prototype, "aspectRatio", void 0);
Giphy = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], Giphy);
exports.Giphy = Giphy;
let Image = class Image {
    static _GRAPHQL_METADATA_FACTORY() {
        return { url: { type: () => String } };
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { url: { required: true, type: () => String } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Image.prototype, "url", void 0);
Image = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], Image);
exports.Image = Image;
let Attachment = class Attachment {
    static _GRAPHQL_METADATA_FACTORY() {
        return { link: { type: () => String }, type: { type: () => require("./message.dto").AttachmentType }, size: { nullable: true, type: () => String }, fileName: { nullable: true, type: () => String } };
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { link: { required: true, type: () => String }, type: { required: true, type: () => String, enum: require("./message.dto").AttachmentType }, size: { required: false, type: () => String }, fileName: { required: false, type: () => String } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Attachment.prototype, "link", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => message_dto_1.AttachmentType),
    tslib_1.__metadata("design:type", String)
], Attachment.prototype, "type", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Attachment.prototype, "size", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Attachment.prototype, "fileName", void 0);
Attachment = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], Attachment);
exports.Attachment = Attachment;
let PollOption = class PollOption {
    static _GRAPHQL_METADATA_FACTORY() {
        return { option: { type: () => String }, votes: { nullable: true, type: () => Object } };
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { option: { required: true, type: () => String }, votes: { required: false } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], PollOption.prototype, "option", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [mongodb_1.ObjectID], { defaultValue: [] }),
    tslib_1.__metadata("design:type", Set)
], PollOption.prototype, "votes", void 0);
PollOption = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], PollOption);
exports.PollOption = PollOption;
let Poll = class Poll {
    static _GRAPHQL_METADATA_FACTORY() {
        return { question: { type: () => String }, options: { type: () => [require("./message.entity").PollOption] }, allowMultipleAnswers: { type: () => Boolean } };
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { question: { required: true, type: () => String }, options: { required: true, type: () => [require("./message.entity").PollOption] }, allowMultipleAnswers: { required: true, type: () => Boolean } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Poll.prototype, "question", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [PollOption]),
    tslib_1.__metadata("design:type", Array)
], Poll.prototype, "options", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Boolean),
    tslib_1.__metadata("design:type", Boolean)
], Poll.prototype, "allowMultipleAnswers", void 0);
Poll = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], Poll);
exports.Poll = Poll;
let Tag = class Tag {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, type: { type: () => require("./message.dto").TagType } };
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, type: { required: true, type: () => String, enum: require("./message.dto").TagType } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Tag.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => message_dto_1.TagType),
    tslib_1.__metadata("design:type", String)
], Tag.prototype, "type", void 0);
Tag = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], Tag);
exports.Tag = Tag;
let RichMessageContent = class RichMessageContent {
    static _GRAPHQL_METADATA_FACTORY() {
        return { reply: { nullable: true, type: () => require("./message.entity").ReplyMessage }, giphy: { nullable: true, type: () => require("./message.entity").Giphy }, images: { nullable: true, type: () => [require("./message.entity").Image] }, attachments: { nullable: true, type: () => [require("./message.entity").Attachment] }, poll: { nullable: true, type: () => require("./message.entity").Poll } };
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { reply: { required: false, type: () => require("./message.entity").ReplyMessage }, giphy: { required: false, type: () => require("./message.entity").Giphy }, images: { required: false, type: () => [require("./message.entity").Image] }, attachments: { required: false, type: () => [require("./message.entity").Attachment] }, poll: { required: false, type: () => require("./message.entity").Poll } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => ReplyMessage, { nullable: true }),
    tslib_1.__metadata("design:type", ReplyMessage)
], RichMessageContent.prototype, "reply", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Giphy, { nullable: true }),
    tslib_1.__metadata("design:type", Giphy)
], RichMessageContent.prototype, "giphy", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [Image], { nullable: true }),
    tslib_1.__metadata("design:type", Array)
], RichMessageContent.prototype, "images", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [Attachment], { nullable: true }),
    tslib_1.__metadata("design:type", Array)
], RichMessageContent.prototype, "attachments", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Poll, { nullable: true }),
    tslib_1.__metadata("design:type", Poll)
], RichMessageContent.prototype, "poll", void 0);
RichMessageContent = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], RichMessageContent);
exports.RichMessageContent = RichMessageContent;
let ChatMessageData = class ChatMessageData {
    static _GRAPHQL_METADATA_FACTORY() {
        return { text: { type: () => String }, conversation: { type: () => require("../../conversation/models/ChatConversation.entity").ChatConversation }, sender: { type: () => require("../../user/models/user.model").UserField } };
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { text: { required: true, type: () => String }, conversation: { required: true, type: () => require("../../conversation/models/ChatConversation.entity").ChatConversation }, sender: { required: true, type: () => require("../../user/models/user.model").UserField } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], ChatMessageData.prototype, "text", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => ChatConversation_entity_1.ChatConversation),
    tslib_1.__metadata("design:type", ChatConversation_entity_1.ChatConversation)
], ChatMessageData.prototype, "conversation", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", user_model_1.UserField)
], ChatMessageData.prototype, "sender", void 0);
ChatMessageData = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], ChatMessageData);
exports.ChatMessageData = ChatMessageData;
let ChatMessage = class ChatMessage {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => require("bson").ObjectId }, text: { type: () => String }, created: { type: () => Date }, sender: { type: () => require("../../user/models/user.model").UserField }, deleted: { type: () => Boolean }, resolved: { type: () => Boolean }, likes: { type: () => [require("bson").ObjectId] }, likesCount: { type: () => Number }, richContent: { nullable: true, type: () => require("./message.entity").RichMessageContent }, reactions: { nullable: true, type: () => [require("./message.model").Reaction] }, isSenderBlocked: { nullable: true, type: () => Boolean }, tags: { nullable: true, type: () => [require("./message.entity").Tag] } };
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => require("bson").ObjectId }, text: { required: true, type: () => String }, created: { required: true, type: () => Date }, sender: { required: true, type: () => require("../../user/models/user.model").UserField }, deleted: { required: true, type: () => Boolean }, resolved: { required: true, type: () => Boolean }, likes: { required: true, type: () => [require("bson").ObjectId] }, likesCount: { required: true, type: () => Number }, richContent: { required: false, type: () => require("./message.entity").RichMessageContent }, reactions: { required: false, type: () => [require("./message.model").Reaction] }, isSenderBlocked: { required: false, type: () => Boolean }, tags: { required: false, type: () => [require("./message.entity").Tag] } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], ChatMessage.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], ChatMessage.prototype, "text", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Date)
], ChatMessage.prototype, "created", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", user_model_1.UserField)
], ChatMessage.prototype, "sender", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ defaultValue: false }),
    tslib_1.__metadata("design:type", Boolean)
], ChatMessage.prototype, "deleted", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ defaultValue: false }),
    tslib_1.__metadata("design:type", Boolean)
], ChatMessage.prototype, "resolved", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [mongodb_1.ObjectID]),
    tslib_1.__metadata("design:type", Array)
], ChatMessage.prototype, "likes", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Number),
    tslib_1.__metadata("design:type", Number)
], ChatMessage.prototype, "likesCount", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => RichMessageContent, { nullable: true }),
    tslib_1.__metadata("design:type", RichMessageContent)
], ChatMessage.prototype, "richContent", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [message_model_1.Reaction], { nullable: true }),
    tslib_1.__metadata("design:type", Array)
], ChatMessage.prototype, "reactions", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)({ defaultValue: false, nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], ChatMessage.prototype, "isSenderBlocked", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [Tag], { nullable: true }),
    tslib_1.__metadata("design:type", Array)
], ChatMessage.prototype, "tags", void 0);
ChatMessage = tslib_1.__decorate([
    (0, graphql_1.ObjectType)(),
    (0, graphql_1.Directive)('@key(fields: "id")')
], ChatMessage);
exports.ChatMessage = ChatMessage;
/***
 * compare ChatMessage and SocketChatMessage when adding new field
 */
class SocketChatMessage {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => require("bson").ObjectId }, text: { type: () => String }, created: { type: () => Date }, sender: { type: () => Object }, deleted: { type: () => Boolean }, resolved: { type: () => Boolean }, likesCount: { type: () => Number }, likes: { type: () => [require("bson").ObjectId] }, richContent: { nullable: true, type: () => require("./message.entity").RichMessageContent }, reactions: { nullable: true, type: () => [require("./message.model").Reaction] }, isSenderBlocked: { nullable: true, type: () => Boolean } };
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => require("bson").ObjectId }, text: { required: true, type: () => String }, created: { required: true, type: () => Date }, sender: { required: true, type: () => Object }, deleted: { required: true, type: () => Boolean }, resolved: { required: true, type: () => Boolean }, likesCount: { required: true, type: () => Number }, likes: { required: true, type: () => [require("bson").ObjectId] }, richContent: { required: false, type: () => require("./message.entity").RichMessageContent }, reactions: { required: false, type: () => [require("./message.model").Reaction] }, isSenderBlocked: { required: false, type: () => Boolean } };
    }
}
exports.SocketChatMessage = SocketChatMessage;
let PaginatedChatMessages = class PaginatedChatMessages {
    static _GRAPHQL_METADATA_FACTORY() {
        return { messages: { type: () => [require("./message.entity").ChatMessage] }, hasMore: { type: () => Boolean } };
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { messages: { required: true, type: () => [require("./message.entity").ChatMessage] }, hasMore: { required: true, type: () => Boolean } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [ChatMessage]),
    tslib_1.__metadata("design:type", Array)
], PaginatedChatMessages.prototype, "messages", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", Boolean)
], PaginatedChatMessages.prototype, "hasMore", void 0);
PaginatedChatMessages = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], PaginatedChatMessages);
exports.PaginatedChatMessages = PaginatedChatMessages;
//# sourceMappingURL=message.entity.js.map
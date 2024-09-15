import { ObjectID } from 'mongodb';
export declare enum GifType {
    Gif = "gif",
    Sticker = "sticker"
}
export declare class ReplyMessageDto {
    id: ObjectID;
}
export declare class GifDto {
    id: string;
    type: GifType;
    width: number;
    height: number;
    aspectRatio: number;
}
export declare class ImageDto {
    url: string;
}
export declare enum AttachmentType {
    PDF = "pdf"
}
export declare class AttachmentDto {
    link: string;
    type: AttachmentType;
    size?: string;
    fileName?: string;
}
export declare class PollOptionDto {
    option: string;
    votes?: Set<ObjectID>;
}
export declare class PollDto {
    question: string;
    options: PollOptionDto[];
    allowMultipleAnswers: boolean;
}
export declare class RichContentDto {
    reply?: ReplyMessageDto;
    giphy?: GifDto;
    images?: ImageDto[];
    attachments?: AttachmentDto[];
    poll?: PollDto;
}
export declare class MessageDto {
    text: string;
    conversationId: ObjectID;
    richContent?: RichContentDto;
}
export declare class GetMessageDto {
    conversationId: ObjectID;
    offsetId?: ObjectID;
    limit: number;
}
export declare class DeleteMessageDto {
    conversationId: ObjectID;
    messageId: ObjectID;
}
export declare class ResolveMessageDto {
    conversationId: ObjectID;
    messageId: ObjectID;
}
export declare class LikeMessageDto {
    userId: ObjectID;
    messageId: ObjectID;
    conversationId: ObjectID;
}
export declare class ReactionDto {
    reaction: string;
    reactionUnicode: string;
    messageId: ObjectID;
    conversationId: ObjectID;
}
export declare enum TagType {
    chat = "chat"
}
export declare class TagDto {
    id: string;
    type: TagType;
}
export declare class TagsDto {
    messageId: ObjectID;
    conversationId: ObjectID;
    tags: TagDto[];
}

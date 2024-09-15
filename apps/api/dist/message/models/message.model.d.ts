import { Document } from 'mongoose';
import { ObjectID } from 'mongodb';
import { AttachmentType, GifType, TagType } from './message.dto';
export declare class ReplyMessage {
    id: ObjectID;
}
export declare class Giphy {
    id: string;
    type: GifType;
    height: number;
    width: number;
    aspectRatio: number;
}
export declare class Image {
    url: string;
}
export declare class Attachment {
    link: string;
    type: AttachmentType;
    size?: string;
    fileName?: string;
}
export declare class PollOption {
    option: string;
    votes?: Set<ObjectID>;
}
export declare class Poll {
    question: string;
    options: Array<PollOption>;
    allowMultipleAnswers: boolean;
}
export declare class RichMessageContent {
    reply?: ReplyMessage;
    giphy?: Giphy;
    images?: Image[];
    attachments?: Attachment[];
    poll?: Poll;
}
export declare class Reaction {
    reaction: string;
    reactionUnicode: string;
    userIds: string[];
}
export declare class Tag {
    id: string;
    type: TagType;
}
export declare class ChatMessageModel {
    id: ObjectID;
    text: string;
    created: Date;
    senderId: ObjectID;
    conversationId: ObjectID;
    deleted: boolean;
    resolved: boolean;
    likes: Array<ObjectID>;
    richContent?: RichMessageContent;
    reactions?: Reaction[];
    tags?: Tag[];
    /**
     * All the properties below are virtual properties
     * @url https://mongoosejs.com/docs/tutorials/virtuals.html
     **/
    conversation: {
        id: string;
    };
    likesCount: number;
    sender: {
        id: string;
    };
}
export declare type ChatMessageDocument = ChatMessageModel & Document;
export declare const ChatMessageSchema: import("mongoose").Schema<Document<ChatMessageModel, any, any>, import("mongoose").Model<Document<ChatMessageModel, any, any>, any, any>, undefined, {}>;
export declare function chatMessageToObject(doc: ChatMessageDocument): ChatMessageModel;

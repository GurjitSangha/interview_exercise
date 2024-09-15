import { ObjectID } from 'mongodb';
import { UserField, MessageSender } from '../../user/models/user.model';
import { ChatConversation } from '../../conversation/models/ChatConversation.entity';
import { AttachmentType, GifType, TagType } from './message.dto';
import { Reaction } from './message.model';
declare class ReplyMessageSocket {
    text?: string;
    created?: Date;
    sender?: MessageSender;
    richContent?: RichMessageContent;
    deleted?: boolean;
}
export declare class ReplyMessage extends ReplyMessageSocket {
    id: ObjectID;
}
export declare class Giphy {
    id: string;
    type: GifType;
    width: number;
    height: number;
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
    options: PollOption[];
    allowMultipleAnswers: boolean;
}
export declare class Tag {
    id: string;
    type: TagType;
}
export declare class RichMessageContent {
    reply?: ReplyMessage;
    giphy?: Giphy;
    images?: Image[];
    attachments?: Attachment[];
    poll?: Poll;
}
export declare class ChatMessageData {
    text: string;
    conversation: ChatConversation;
    sender: UserField;
}
export declare class ChatMessage {
    id: ObjectID;
    text: string;
    created: Date;
    sender: UserField;
    deleted: boolean;
    resolved: boolean;
    likes: Array<ObjectID>;
    likesCount: number;
    richContent?: RichMessageContent;
    reactions?: Reaction[];
    isSenderBlocked?: boolean;
    tags?: Tag[];
}
/***
 * compare ChatMessage and SocketChatMessage when adding new field
 */
export declare class SocketChatMessage {
    id: ObjectID;
    text: string;
    created: Date;
    sender: MessageSender;
    deleted: boolean;
    resolved: boolean;
    likesCount: number;
    likes: ObjectID[];
    richContent?: RichMessageContent;
    reactions?: Reaction[];
    isSenderBlocked?: boolean;
}
export declare class PaginatedChatMessages {
    messages: ChatMessage[];
    hasMore: boolean;
}
export {};

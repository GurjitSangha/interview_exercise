import { Tag } from './CreateChatConversation.dto';
import { ObjectID } from 'mongodb';
import { Document } from 'mongoose';
import { Permission } from './Permission.dto';
import { Product, ContextSchema } from './ContextSchema.dto';
export declare class ChatConversationModel {
    /**
     * No props here it's added to all documents but we need this
     * to be able to match the return type
     */
    id: string;
    permissions: Permission[];
    product: Product;
    context: ContextSchema[];
    memberIds: string[];
    blockedMemberIds: string[];
    lastMessageId: ObjectID;
    pinnedMessages?: ObjectID[];
    tags?: Tag[];
}
export declare type ChatConversationDocument = ChatConversationModel & Document;
export declare function chatConversationToObject(doc?: ChatConversationDocument): ChatConversationModel;
export declare const ChatConversationSchema: import("mongoose").Schema<Document<ChatConversationModel, any, any>, import("mongoose").Model<Document<ChatConversationModel, any, any>, any, any>, undefined, {}>;

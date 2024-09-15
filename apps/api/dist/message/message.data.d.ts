import { Model } from 'mongoose';
import { ChatMessageDocument, ChatMessageModel, Tag } from './models/message.model';
import { ChatMessage, PaginatedChatMessages } from './models/message.entity';
import { MessageDto, GetMessageDto } from './models/message.dto';
import { ObjectID } from 'mongodb';
import { MessageGroupedByConversationOutput } from '../conversation/models/messagesFilterInput';
export declare class MessageData {
    protected chatMessageModel: Model<ChatMessageDocument>;
    constructor(chatMessageModel: Model<ChatMessageDocument>);
    create(data: MessageDto, senderId: ObjectID): Promise<ChatMessageModel>;
    getMessage(messageId: string): Promise<ChatMessageModel>;
    getChatConversationMessages(data: GetMessageDto): Promise<PaginatedChatMessages>;
    delete(messageId: ObjectID): Promise<ChatMessage>;
    resolve(messageId: ObjectID): Promise<ChatMessage>;
    unresolve(messageId: ObjectID): Promise<ChatMessage>;
    like(userId: ObjectID, messageId: ObjectID): Promise<ChatMessage>;
    unlike(userId: ObjectID, messageId: ObjectID): Promise<ChatMessage>;
    addReaction(reaction: string, userId: ObjectID, reactionUnicode: string, messageId: ObjectID): Promise<ChatMessage>;
    removeReaction(reaction: string, userId: ObjectID, messageId: ObjectID): Promise<ChatMessage>;
    updateTags(messageId: ObjectID, tags: Tag[]): Promise<ChatMessage>;
    getMessages(ids: ObjectID[]): Promise<ChatMessage[]>;
    getMessagesGroupedByConversation(conversationIds: ObjectID[], startDate?: string, endDate?: string): Promise<MessageGroupedByConversationOutput[]>;
    addVote(messageId: ObjectID, userId: ObjectID, option: string): Promise<ChatMessage>;
    removeVote(messageId: ObjectID, userId: ObjectID, option: string): Promise<ChatMessage>;
}

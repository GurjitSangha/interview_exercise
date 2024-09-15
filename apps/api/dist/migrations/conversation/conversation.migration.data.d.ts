import { Model } from 'mongoose';
import { ChatConversationDocument } from '../../conversation/models/conversation.model';
import { MessageData } from '../../message/message.data';
import { ConversationData } from '../../conversation/conversation.data';
export declare class ConversationMigrationData {
    private chatConversationModel;
    private messageData;
    private conversationData;
    constructor(chatConversationModel: Model<ChatConversationDocument>, messageData: MessageData, conversationData: ConversationData);
    migrateLastMessagesForEveryConversation(): Promise<boolean>;
}

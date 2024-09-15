import { ConversationMigrationData } from './conversation.migration.data';
export declare class ConversationMigrationLogic {
    private conversationMigrationData;
    constructor(conversationMigrationData: ConversationMigrationData);
    migrateLastMessagesForEveryConversation(): Promise<boolean>;
}

import { ChatConversation } from '../../conversation/models/ChatConversation.entity';
import { Context } from '../../conversation/models/ContextSchema.dto';
export declare class ConversationInbox {
    contexts: Context[];
    conversations: ChatConversation[];
}

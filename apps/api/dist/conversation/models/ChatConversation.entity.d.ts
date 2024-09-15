import { ChatMessage } from '../../message/models/message.entity';
export declare class ChatConversation {
    id: string;
    unreadMessageCount?: number;
    lastMessage?: ChatMessage;
}

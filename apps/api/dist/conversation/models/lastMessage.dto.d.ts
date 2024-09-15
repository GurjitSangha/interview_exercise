import { ChatMessage } from '../../message/models/message.entity';
export declare type LastMessageOutput = {
    id: string;
    lastMessage?: ChatMessage;
};
export declare class LastMessageInput {
    userId: string;
    conversationIds?: string[];
}

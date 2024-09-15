export declare type UnreadCountOutput = {
    id: string;
    unreadMessageCount: number;
};
export declare class UnreadCountInput {
    userId: string;
    conversationIds?: string[];
}

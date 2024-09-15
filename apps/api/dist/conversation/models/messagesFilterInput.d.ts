export declare type MessageGroupedByConversationOutput = {
    _id: string;
    messages: {
        message: string;
        senderId: string;
    }[];
    conversationId: string;
};
export declare class MessagesFilterInput {
    conversationIds: string[];
    startDate: string;
    endDate: string;
}

import { ObjectID } from 'mongodb';
export declare class LastRead {
    userId: string;
    conversationId: string;
    messageId: ObjectID;
}

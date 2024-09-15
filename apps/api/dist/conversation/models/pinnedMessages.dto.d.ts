import { ObjectID } from 'mongodb';
export declare class pinMessageDTO {
    messageId: ObjectID;
    conversationId: string;
}
export declare class unpinMessageDTO {
    messageId: ObjectID;
    conversationId: string;
}

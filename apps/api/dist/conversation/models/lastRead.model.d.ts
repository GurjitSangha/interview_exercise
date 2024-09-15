import { ObjectID } from 'mongodb';
import { Document } from 'mongoose';
export declare class LastReadModel {
    userId: string;
    conversationId: string;
    messageId: ObjectID;
}
export declare const LastReadSchema: import("mongoose").Schema<Document<LastReadModel, any, any>, import("mongoose").Model<Document<LastReadModel, any, any>, any, any>, undefined, {}>;
export declare type LastReadDocument = LastReadModel & Document;
export declare function lastReadDocumentToObject(doc: LastReadDocument): LastReadModel;

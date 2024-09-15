import { ObjectID } from 'mongodb';
import { Document } from 'mongoose';
export declare class UserBlockModel {
    id: string;
    blockedUserId: ObjectID;
    blockingUserId: ObjectID;
    scope: string;
    scopeId: ObjectID;
}
export declare type UserBlockDTo = Omit<UserBlockModel, 'id'>;
export declare type UserBlockDocument = UserBlockModel & Document;
export declare const UserBlockSchema: import("mongoose").Schema<Document<UserBlockModel, any, any>, import("mongoose").Model<Document<UserBlockModel, any, any>, any, any>, undefined, {}>;
export declare type UserBlockScope = {
    scope: typeof UserBlockModel.prototype.scope;
    scopeId: typeof UserBlockModel.prototype.scopeId;
};

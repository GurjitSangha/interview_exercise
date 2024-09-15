import { FilterQuery, ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { UserBlockDTo, UserBlockDocument, UserBlockScope } from './models/user-blocks.model';
export interface IUserBlocksData {
    countUserBlocks(userId: ObjectId, scopes: UserBlockScope[]): Promise<number>;
    createUserBlock(userBlock: UserBlockDTo): Promise<UserBlockDTo | null>;
    deleteUserBlock(userBlock: FilterQuery<UserBlockDocument>): Promise<number>;
    getBlockedUsers(userIds: ObjectId[], scope: UserBlockScope): Promise<UserBlockDTo[]>;
}
export declare class UserBlocksData implements IUserBlocksData {
    protected userBlockModel: Model<UserBlockDocument>;
    constructor(userBlockModel: Model<UserBlockDocument>);
    countUserBlocks(userId: ObjectId, scopes: UserBlockScope[]): Promise<number>;
    createUserBlock(userBlock: UserBlockDTo): Promise<UserBlockDTo>;
    deleteUserBlock(userBlock: FilterQuery<UserBlockDocument>): Promise<number>;
    getBlockedUsers(userIds: ObjectId[], scope: UserBlockScope): Promise<UserBlockDTo[]>;
    getUserToUserBlocks(firstUserId: ObjectId, secondUserId: ObjectId): Promise<UserBlockDTo[]>;
    private convertDocumentToDto;
}

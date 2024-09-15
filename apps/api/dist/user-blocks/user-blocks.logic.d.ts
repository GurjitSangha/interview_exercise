import { ObjectId } from 'mongodb';
import { UserBlockDTo, UserBlockScope } from './models/user-blocks.model';
import { UserBlocksData } from './user-blocks.data';
export interface IUserBlocksLogic {
    blockUser(userBlock: UserBlockDTo): Promise<UserBlockDTo>;
    getBlockedUsers(userIds: ObjectId[], scope: UserBlockScope): Promise<UserBlockDTo[]>;
    isUserBlocked(userId: ObjectId, scopes: UserBlockScope[]): Promise<boolean>;
    unblockUser(userId: ObjectId, scope: UserBlockScope): Promise<boolean>;
}
export declare class UserBlocksLogic implements IUserBlocksLogic {
    private userBlocksData;
    constructor(userBlocksData: UserBlocksData);
    blockUser(userBlock: UserBlockDTo): Promise<UserBlockDTo>;
    /**
     *
     * @param userIds
     * @param scope
     * @returns the list of blocked users
     */
    getBlockedUsers(userIds: ObjectId[], scope: UserBlockScope): Promise<UserBlockDTo[]>;
    isUserBlocked(userId: ObjectId, scopes: UserBlockScope[]): Promise<boolean>;
    unblockUser(userId: ObjectId, scope: UserBlockScope): Promise<boolean>;
    unblockUserToUser(blockerUserId: ObjectId, blockedUserId: ObjectId): Promise<boolean>;
    userToUserBlockingExists(firstUserId: ObjectId, secondUserId: ObjectId): Promise<boolean>;
}

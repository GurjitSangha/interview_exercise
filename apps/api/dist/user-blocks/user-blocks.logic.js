"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBlocksLogic = void 0;
const tslib_1 = require("tslib");
const userToUserBlockScope_1 = require("./dtos/userToUserBlockScope");
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const user_blocks_data_1 = require("./user-blocks.data");
let UserBlocksLogic = class UserBlocksLogic {
    constructor(userBlocksData) {
        this.userBlocksData = userBlocksData;
    }
    blockUser(userBlock) {
        return this.userBlocksData.createUserBlock(userBlock);
    }
    /**
     *
     * @param userIds
     * @param scope
     * @returns the list of blocked users
     */
    async getBlockedUsers(userIds, scope) {
        return await this.userBlocksData.getBlockedUsers(userIds, scope);
    }
    async isUserBlocked(userId, scopes) {
        const result = await this.userBlocksData.countUserBlocks(userId, scopes);
        return result > 0;
    }
    async unblockUser(userId, scope) {
        const result = await this.userBlocksData.deleteUserBlock({
            blockedUserId: userId,
            scope: scope.scope,
            scopeId: scope.scopeId,
        });
        if (result)
            return true;
        return false;
    }
    async unblockUserToUser(blockerUserId, blockedUserId) {
        const result = await this.userBlocksData.deleteUserBlock({
            blockedUserId: blockedUserId,
            blockingUserId: blockerUserId,
            scope: userToUserBlockScope_1.UserToUserBlockScope.scope,
            scopeId: new mongodb_1.ObjectId(userToUserBlockScope_1.UserToUserBlockScope.scopeId),
        });
        if (result)
            return true;
        return false;
    }
    async userToUserBlockingExists(firstUserId, secondUserId) {
        const results = await this.userBlocksData.getUserToUserBlocks(firstUserId, secondUserId);
        return (results === null || results === void 0 ? void 0 : results.length) > 0;
    }
};
UserBlocksLogic = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [user_blocks_data_1.UserBlocksData])
], UserBlocksLogic);
exports.UserBlocksLogic = UserBlocksLogic;
//# sourceMappingURL=user-blocks.logic.js.map
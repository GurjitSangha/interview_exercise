"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBlocksData = void 0;
const tslib_1 = require("tslib");
const userToUserBlockScope_1 = require("./dtos/userToUserBlockScope");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_blocks_model_1 = require("./models/user-blocks.model");
let UserBlocksData = class UserBlocksData {
    constructor(userBlockModel) {
        this.userBlockModel = userBlockModel;
    }
    async countUserBlocks(userId, scopes) {
        return await this.userBlockModel
            .count({ blockedUserId: userId })
            .or(scopes);
    }
    async createUserBlock(userBlock) {
        const createdDocument = await this.userBlockModel.create(userBlock);
        return this.convertDocumentToDto(createdDocument);
    }
    async deleteUserBlock(userBlock) {
        const { deletedCount } = await this.userBlockModel.deleteOne(userBlock);
        if (deletedCount === null || deletedCount === undefined) {
            throw new Error('The user block does not exist to delete');
        }
        return deletedCount;
    }
    async getBlockedUsers(userIds, scope) {
        const query = {
            blockedUserId: { $in: userIds },
            scope: scope.scope,
            scopeId: scope.scopeId,
        };
        const result = await this.userBlockModel.find(query);
        return result.map(this.convertDocumentToDto);
    }
    async getUserToUserBlocks(firstUserId, secondUserId) {
        const query = {
            blockedUserId: { $in: [firstUserId, secondUserId] },
            blockingUserId: { $in: [firstUserId, secondUserId] },
            scope: userToUserBlockScope_1.UserToUserBlockScope.scope,
        };
        const result = await this.userBlockModel.find(query);
        return result.map(this.convertDocumentToDto);
    }
    convertDocumentToDto(document) {
        if (!document) {
            throw new Error('No User Blocks document found');
        }
        const { blockingUserId, blockedUserId, scope, scopeId } = document.toObject({
            getters: true,
            virtuals: true,
            versionKey: false,
        });
        return { blockingUserId, blockedUserId, scope, scopeId };
    }
};
UserBlocksData = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(user_blocks_model_1.UserBlockModel.name)),
    tslib_1.__metadata("design:paramtypes", [mongoose_2.Model])
], UserBlocksData);
exports.UserBlocksData = UserBlocksData;
//# sourceMappingURL=user-blocks.data.js.map
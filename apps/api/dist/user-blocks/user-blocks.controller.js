"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBlocksController = void 0;
const tslib_1 = require("tslib");
const openapi = require("@nestjs/swagger");
const userToUserBlockScope_1 = require("./dtos/userToUserBlockScope");
const mongodb_1 = require("mongodb");
const common_1 = require("@nestjs/common");
const conversation_logic_1 = require("../conversation/conversation.logic");
const blockUserRequest_dto_1 = require("./dtos/blockUserRequest.dto");
const user_blocks_logic_1 = require("./user-blocks.logic");
const ContextSchema_dto_1 = require("../conversation/models/ContextSchema.dto");
let UserBlocksController = class UserBlocksController {
    constructor(userBlocksLogic, conversationLogic) {
        this.userBlocksLogic = userBlocksLogic;
        this.conversationLogic = conversationLogic;
    }
    async toggleUserBlock(blockUserDTO) {
        /* Single endpoint to perform both blocking and unblocking
         * When set_blocked is true, do block, else do unblock
         * */
        const memberIds = [blockUserDTO.blocker, blockUserDTO.blocked_user];
        const conversation = await this.conversationLogic.getExistingDirectConversation(memberIds);
        if (!conversation) {
            if (blockUserDTO.set_blocked) {
                await this.userBlocksLogic.blockUser({
                    blockedUserId: new mongodb_1.ObjectID(blockUserDTO.blocked_user),
                    blockingUserId: new mongodb_1.ObjectID(blockUserDTO.blocker),
                    scope: userToUserBlockScope_1.UserToUserBlockScope.scope,
                    scopeId: new mongodb_1.ObjectID(userToUserBlockScope_1.UserToUserBlockScope.scopeId),
                });
            }
            else {
                await this.userBlocksLogic.unblockUserToUser(new mongodb_1.ObjectID(blockUserDTO.blocker), new mongodb_1.ObjectID(blockUserDTO.blocked_user));
            }
            return;
        }
        if (blockUserDTO.set_blocked) {
            // Perform blocking
            await Promise.all([
                this.conversationLogic.blockMember([conversation.id], blockUserDTO.blocked_user),
                this.userBlocksLogic.blockUser({
                    blockedUserId: new mongodb_1.ObjectID(blockUserDTO.blocked_user),
                    blockingUserId: new mongodb_1.ObjectID(blockUserDTO.blocker),
                    scope: ContextSchema_dto_1.ContextType.isDirectConversation,
                    scopeId: new mongodb_1.ObjectID(conversation.id),
                }),
            ]);
        }
        else {
            // Perform unblocking
            await Promise.all([
                this.conversationLogic.unblockMember([conversation.id], blockUserDTO.blocked_user),
                this.userBlocksLogic.unblockUser(new mongodb_1.ObjectID(blockUserDTO.blocked_user), {
                    scope: ContextSchema_dto_1.ContextType.isDirectConversation,
                    scopeId: new mongodb_1.ObjectID(conversation.id),
                }),
            ]);
        }
    }
};
tslib_1.__decorate([
    (0, common_1.Post)('toggle'),
    openapi.ApiResponse({ status: 201 }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [blockUserRequest_dto_1.BlockUserRequestDTO]),
    tslib_1.__metadata("design:returntype", Promise)
], UserBlocksController.prototype, "toggleUserBlock", null);
UserBlocksController = tslib_1.__decorate([
    (0, common_1.Controller)('user-blocks'),
    tslib_1.__metadata("design:paramtypes", [user_blocks_logic_1.UserBlocksLogic,
        conversation_logic_1.ConversationLogic])
], UserBlocksController);
exports.UserBlocksController = UserBlocksController;
//# sourceMappingURL=user-blocks.controller.js.map
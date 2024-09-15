"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbilityFactory = void 0;
const tslib_1 = require("tslib");
const conversation_logic_1 = require("./../conversation/conversation.logic");
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const user_blocks_logic_1 = require("../user-blocks/user-blocks.logic");
const extractUniversityIdsFromContext_1 = require("../conversation/extractUniversityIdsFromContext");
const permissions_model_1 = require("./models/permissions.model");
const ContextSchema_dto_1 = require("../conversation/models/ContextSchema.dto");
let AbilityFactory = class AbilityFactory {
    constructor(userBlocksLogic, conversationLogic) {
        this.userBlocksLogic = userBlocksLogic;
        this.conversationLogic = conversationLogic;
    }
    async isBlockedOnDirectConversation(contexts, userId, conversationId) {
        const isDirectConversation = this.conversationLogic.isDirectConversation(contexts);
        if (!isDirectConversation) {
            return false;
        }
        return await this.userBlocksLogic.isUserBlocked(userId, [
            {
                scopeId: new mongodb_1.ObjectId(conversationId),
                scope: ContextSchema_dto_1.ContextType.isDirectConversation,
            },
        ]);
    }
    async factory(user, conversation, message) {
        if (!conversation) {
            return [];
        }
        const { id, permissions = [], memberIds, blockedMemberIds, context, } = conversation;
        const userBlockScopes = (0, extractUniversityIdsFromContext_1.getUniversityContexts)(context).map((currentContext) => ({
            // "currentContext.type" is always for university scope only as context is filtered in getUniversityContexts function
            scope: currentContext.type,
            scopeId: new mongodb_1.ObjectId(currentContext.id),
        }));
        const isUserBlockedUniversityScope = await this.userBlocksLogic.isUserBlocked(user.userId, userBlockScopes);
        if (isUserBlockedUniversityScope ||
            (await this.isBlockedOnDirectConversation(context, user.userId, id)))
            return [];
        let senderId;
        if (message) {
            senderId = String(message.senderId);
        }
        const universityIds = (0, extractUniversityIdsFromContext_1.extractUniversityIdsFromContext)({
            conversationContext: context,
        });
        const hydratedPermissions = JSON.parse(JSON.stringify(permissions), (key, value) => {
            if (value === permissions_model_1.ConditionField.messageSenderId) {
                return senderId;
            }
            if (value === permissions_model_1.ConditionField.conversationMemberIds) {
                return memberIds;
            }
            if (value === permissions_model_1.ConditionField.conversationBlockedMemberIds) {
                return blockedMemberIds;
            }
            if (value === permissions_model_1.ConditionField.conversationUniversityIds) {
                return universityIds;
            }
            return value;
        });
        return hydratedPermissions;
    }
};
AbilityFactory = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => conversation_logic_1.ConversationLogic))),
    tslib_1.__metadata("design:paramtypes", [user_blocks_logic_1.UserBlocksLogic,
        conversation_logic_1.ConversationLogic])
], AbilityFactory);
exports.AbilityFactory = AbilityFactory;
//# sourceMappingURL=ability-factory.js.map
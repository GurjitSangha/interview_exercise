"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsService = void 0;
const tslib_1 = require("tslib");
const ability_1 = require("@casl/ability");
const common_1 = require("@nestjs/common");
const conversation_data_1 = require("../conversation/conversation.data");
const message_data_1 = require("../message/message.data");
const ability_factory_1 = require("./ability-factory");
const permissions_model_1 = require("./models/permissions.model");
let PermissionsService = class PermissionsService {
    constructor(conversationData, messageData, abilityFactory) {
        this.conversationData = conversationData;
        this.messageData = messageData;
        this.abilityFactory = abilityFactory;
    }
    stringifyUser(user) {
        const { userId, universityId, accountRole, marketplaceId } = user;
        return {
            userId: String(userId),
            accountRole,
            universityId: universityId ? String(universityId) : undefined,
            marketplaceId: marketplaceId ? String(marketplaceId) : undefined,
        };
    }
    async conversationPermissions({ user, conversationId, action, }) {
        const conversation = await this.conversationData.getConversation(conversationId);
        const ability = new ability_1.Ability(await this.abilityFactory.factory(user, conversation));
        return ability.can(action, (0, ability_1.subject)(permissions_model_1.Subject.user, this.stringifyUser(user)));
    }
    async messagePermissions({ user, messageId, action, }) {
        const message = await this.messageData.getMessage(messageId);
        const conversation = await this.conversationData.getConversation(String(message.conversationId));
        const ability = new ability_1.Ability(await this.abilityFactory.factory(user, conversation, message));
        return ability.can(action, (0, ability_1.subject)(permissions_model_1.Subject.user, this.stringifyUser(user)));
    }
};
PermissionsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [conversation_data_1.ConversationData,
        message_data_1.MessageData,
        ability_factory_1.AbilityFactory])
], PermissionsService);
exports.PermissionsService = PermissionsService;
//# sourceMappingURL=permissions.service.js.map
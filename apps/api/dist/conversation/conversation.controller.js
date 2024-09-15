"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationController = void 0;
const tslib_1 = require("tslib");
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const common_2 = require("@nestjs/common");
const XApiKeyGuard_1 = require("../authentication/XApiKeyGuard");
const conversation_logic_1 = require("./conversation.logic");
const conversation_migration_logic_1 = require("../migrations/conversation/conversation.migration.logic");
const AddMember_dto_1 = require("./models/AddMember.dto");
const CreateChatConversation_dto_1 = require("./models/CreateChatConversation.dto");
const blockUser_dto_1 = require("./models/blockUser.dto");
const migratePermissions_dto_1 = require("./models/migratePermissions.dto");
const DirectChatConversationDto_1 = require("./dto/DirectChatConversationDto");
const message_helper_1 = require("../message/utils/message.helper");
let ConversationController = class ConversationController {
    constructor(conversationLogic, conversationMigrationLogic, configService) {
        this.conversationLogic = conversationLogic;
        this.conversationMigrationLogic = conversationMigrationLogic;
        this.configService = configService;
    }
    async create(createChatConversationDto) {
        return this.conversationLogic.create(createChatConversationDto);
    }
    async createDirectConversation(directChatConvDto) {
        return this.conversationLogic.createDirectChatConversation(directChatConvDto);
    }
    update(conversationId, createChatConversationDto) {
        throw new Error('Endpoint not implemented');
    }
    async updateTags(conversationId, tags) {
        return this.conversationLogic.updateTags(conversationId, tags);
    }
    addMember(conversationId, addMember) {
        return this.conversationLogic.addMember(conversationId, addMember);
    }
    deleteMember(conversationId, memberId) {
        return this.conversationLogic.removeMember(conversationId, memberId);
    }
    blockMember(blockUserDTO) {
        const { conversationIds, memberId } = blockUserDTO;
        return this.conversationLogic.blockMember(conversationIds, memberId);
    }
    unblockMember(blockUserDTO) {
        const { conversationIds, memberId } = blockUserDTO;
        return this.conversationLogic.unblockMember(conversationIds, memberId);
    }
    migratePermissions(migratePermissionsDto) {
        const { permissions, product, conversationIds } = migratePermissionsDto;
        return this.conversationLogic.migratePermissions(permissions, product, conversationIds);
    }
    migrateLastMessages() {
        var _a;
        if ((_a = this.configService.get('migrations')) === null || _a === void 0 ? void 0 : _a.allowMigrations) {
            return this.conversationMigrationLogic.migrateLastMessagesForEveryConversation();
        }
        else {
            throw new Error('Migrations are not enabled');
        }
    }
    async getUnreadMessageCounts(userId, conversationIds) {
        const unreadCountInput = { userId, conversationIds };
        return this.conversationLogic.getUnreadMessageCounts(unreadCountInput);
    }
    async getMessages(conversationIds, startDate, endDate, res) {
        const messagesFilterInput = {
            startDate,
            endDate,
            conversationIds,
        };
        if (!(0, message_helper_1.isDateDifferenceWithin7Days)(startDate, endDate)) {
            res.status(403).send('Duration must be with in 7 days');
        }
        return await this.conversationLogic.getMessagesByConversation(messagesFilterInput);
    }
};
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiSecurity)('X-API-KEY'),
    (0, common_1.UseGuards)(XApiKeyGuard_1.XApiKeyGuard),
    openapi.ApiResponse({ status: 201, type: require("./models/ChatConversation.entity").ChatConversation }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateChatConversation_dto_1.CreateChatConversationDto]),
    tslib_1.__metadata("design:returntype", Promise)
], ConversationController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Post)('direct'),
    (0, swagger_1.ApiSecurity)('X-API-KEY'),
    (0, common_1.UseGuards)(XApiKeyGuard_1.XApiKeyGuard),
    openapi.ApiResponse({ status: 201, type: require("./models/ChatConversation.entity").ChatConversation }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [DirectChatConversationDto_1.DirectChatConversationDto]),
    tslib_1.__metadata("design:returntype", Promise)
], ConversationController.prototype, "createDirectConversation", null);
tslib_1.__decorate([
    (0, common_1.Put)(':conversationId'),
    (0, swagger_1.ApiSecurity)('X-API-KEY'),
    openapi.ApiResponse({ status: 200 }),
    tslib_1.__param(0, (0, common_1.Param)('conversationId')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, CreateChatConversation_dto_1.CreateChatConversationDto]),
    tslib_1.__metadata("design:returntype", void 0)
], ConversationController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Put)(':conversationId/tags'),
    (0, swagger_1.ApiSecurity)('X-API-KEY'),
    (0, common_1.UseGuards)(XApiKeyGuard_1.XApiKeyGuard),
    (0, swagger_1.ApiBody)({ type: [CreateChatConversation_dto_1.Tag] }),
    openapi.ApiResponse({ status: 200, type: require("./models/ChatConversation.entity").ChatConversation }),
    tslib_1.__param(0, (0, common_1.Param)('conversationId')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], ConversationController.prototype, "updateTags", null);
tslib_1.__decorate([
    (0, common_1.Post)(':conversationId/member'),
    (0, swagger_1.ApiSecurity)('X-API-KEY'),
    openapi.ApiResponse({ status: 201, type: require("./models/conversation.model").ChatConversationModel }),
    tslib_1.__param(0, (0, common_1.Param)('conversationId')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, AddMember_dto_1.AddMemberDTO]),
    tslib_1.__metadata("design:returntype", void 0)
], ConversationController.prototype, "addMember", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':conversationId/member/:memberId'),
    (0, swagger_1.ApiSecurity)('X-API-KEY'),
    openapi.ApiResponse({ status: 200, type: require("./models/conversation.model").ChatConversationModel }),
    tslib_1.__param(0, (0, common_1.Param)('conversationId')),
    tslib_1.__param(1, (0, common_1.Param)('memberId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], ConversationController.prototype, "deleteMember", null);
tslib_1.__decorate([
    (0, common_1.Post)('block-user'),
    (0, swagger_1.ApiSecurity)('X-API-KEY'),
    openapi.ApiResponse({ status: 201 }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [blockUser_dto_1.BlockUserDTO]),
    tslib_1.__metadata("design:returntype", void 0)
], ConversationController.prototype, "blockMember", null);
tslib_1.__decorate([
    (0, common_1.Post)('unblock-user'),
    (0, swagger_1.ApiSecurity)('X-API-KEY'),
    openapi.ApiResponse({ status: 201 }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [blockUser_dto_1.BlockUserDTO]),
    tslib_1.__metadata("design:returntype", void 0)
], ConversationController.prototype, "unblockMember", null);
tslib_1.__decorate([
    (0, common_1.Post)('migrate-permissions'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Migration of Permissions done successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 501,
        description: 'Migrations are currently allowed only for community',
    }),
    (0, swagger_1.ApiSecurity)('X-API-KEY'),
    (0, common_2.HttpCode)(200),
    openapi.ApiResponse({ status: 200 }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [migratePermissions_dto_1.MigratePermissionsDTO]),
    tslib_1.__metadata("design:returntype", void 0)
], ConversationController.prototype, "migratePermissions", null);
tslib_1.__decorate([
    (0, common_1.Post)('migrate-last-messages'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Migration of Last Messages done successfully',
    }),
    (0, swagger_1.ApiSecurity)('X-API-KEY'),
    (0, common_2.HttpCode)(200),
    openapi.ApiResponse({ status: 200, type: Boolean }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ConversationController.prototype, "migrateLastMessages", null);
tslib_1.__decorate([
    (0, common_1.Get)('unread-message-count/:userId'),
    (0, swagger_1.ApiSecurity)('X-API-KEY'),
    (0, common_2.HttpCode)(200),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    tslib_1.__param(0, (0, common_1.Param)('userId')),
    tslib_1.__param(1, (0, common_1.Query)('conversationIds')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], ConversationController.prototype, "getUnreadMessageCounts", null);
tslib_1.__decorate([
    (0, common_1.Get)('messages'),
    (0, swagger_1.ApiSecurity)('X-API-KEY'),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden',
    }),
    (0, common_2.HttpCode)(200),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    tslib_1.__param(0, (0, common_1.Query)('conversationIds')),
    tslib_1.__param(1, (0, common_1.Query)('startDate')),
    tslib_1.__param(2, (0, common_1.Query)('endDate')),
    tslib_1.__param(3, (0, common_1.Res)({ passthrough: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ConversationController.prototype, "getMessages", null);
ConversationController = tslib_1.__decorate([
    (0, common_1.Controller)('conversation'),
    tslib_1.__metadata("design:paramtypes", [conversation_logic_1.ConversationLogic,
        conversation_migration_logic_1.ConversationMigrationLogic,
        config_1.ConfigService])
], ConversationController);
exports.ConversationController = ConversationController;
//# sourceMappingURL=conversation.controller.js.map
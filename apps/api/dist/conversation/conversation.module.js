"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationModule = void 0;
const tslib_1 = require("tslib");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const conversation_resolver_1 = require("./conversation.resolver");
const conversation_logic_1 = require("./conversation.logic");
const conversation_controller_1 = require("./conversation.controller");
const conversation_model_1 = require("./models/conversation.model");
const lastRead_model_1 = require("./models/lastRead.model");
const conversation_data_1 = require("./conversation.data");
const permissions_module_1 = require("../permissions/permissions.module");
const cache_manager_module_1 = require("../cache-manager/cache-manager.module");
const message_module_1 = require("../message/message.module");
const conversation_migration_logic_1 = require("../migrations/conversation/conversation.migration.logic");
const conversation_migration_data_1 = require("../migrations/conversation/conversation.migration.data");
const conversation_channel_socket_1 = require("./conversation-channel.socket");
const safeguarding_module_1 = require("../safeguarding/safeguarding.module");
const user_module_1 = require("../user/user.module");
const sockets_module_1 = require("../sockets/sockets.module");
let ConversationModule = class ConversationModule {
};
ConversationModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: conversation_model_1.ChatConversationModel.name, schema: conversation_model_1.ChatConversationSchema },
                { name: lastRead_model_1.LastReadModel.name, schema: lastRead_model_1.LastReadSchema },
            ]),
            (0, common_1.forwardRef)(() => permissions_module_1.PermissionsModule),
            (0, common_1.forwardRef)(() => message_module_1.MessageModule),
            cache_manager_module_1.CacheManagerModule,
            config_1.ConfigService,
            safeguarding_module_1.SafeguardingModule,
            sockets_module_1.SocketsModule,
            user_module_1.UserModule,
        ],
        providers: [
            config_1.ConfigService,
            conversation_channel_socket_1.ConversationChannel,
            conversation_data_1.ConversationData,
            conversation_logic_1.ConversationLogic,
            conversation_migration_data_1.ConversationMigrationData,
            conversation_migration_logic_1.ConversationMigrationLogic,
            conversation_resolver_1.ConversationResolver,
        ],
        controllers: [conversation_controller_1.ConversationController],
        exports: [conversation_channel_socket_1.ConversationChannel, conversation_data_1.ConversationData, conversation_logic_1.ConversationLogic],
    })
], ConversationModule);
exports.ConversationModule = ConversationModule;
//# sourceMappingURL=conversation.module.js.map
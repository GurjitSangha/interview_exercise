"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const message_resolver_1 = require("./message.resolver");
const message_logic_1 = require("./message.logic");
const message_data_1 = require("./message.data");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const message_model_1 = require("./models/message.model");
const permissions_module_1 = require("../permissions/permissions.module");
const user_module_1 = require("../user/user.module");
const conversation_module_1 = require("../conversation/conversation.module");
const safeguarding_module_1 = require("../safeguarding/safeguarding.module");
const message_dataloader_1 = require("./message.dataloader");
const user_blocks_module_1 = require("../user-blocks/user-blocks.module");
let MessageModule = class MessageModule {
};
MessageModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: message_model_1.ChatMessageModel.name, schema: message_model_1.ChatMessageSchema },
            ]),
            (0, common_1.forwardRef)(() => permissions_module_1.PermissionsModule),
            (0, common_1.forwardRef)(() => conversation_module_1.ConversationModule),
            user_module_1.UserModule,
            config_1.ConfigService,
            safeguarding_module_1.SafeguardingModule,
            user_blocks_module_1.UserBlocksModule,
        ],
        providers: [
            message_resolver_1.MessageResolver,
            message_resolver_1.RichMessageContentResolver,
            message_logic_1.MessageLogic,
            message_data_1.MessageData,
            config_1.ConfigService,
            message_dataloader_1.ChatMessageDataLoader,
        ],
        controllers: [],
        exports: [message_data_1.MessageData, message_logic_1.MessageLogic, message_dataloader_1.ChatMessageDataLoader],
    })
], MessageModule);
exports.MessageModule = MessageModule;
//# sourceMappingURL=message.module.js.map
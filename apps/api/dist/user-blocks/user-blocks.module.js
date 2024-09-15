"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBlocksModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const configuration_manager_module_1 = require("../configuration/configuration-manager.module");
const conversation_module_1 = require("../conversation/conversation.module");
const user_blocks_data_1 = require("./user-blocks.data");
const user_blocks_logic_1 = require("./user-blocks.logic");
const user_blocks_model_1 = require("./models/user-blocks.model");
const user_blocks_controller_1 = require("./user-blocks.controller");
let UserBlocksModule = class UserBlocksModule {
};
UserBlocksModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_blocks_model_1.UserBlockModel.name, schema: user_blocks_model_1.UserBlockSchema },
            ]),
            configuration_manager_module_1.ConfigManagerModule,
            (0, common_1.forwardRef)(() => conversation_module_1.ConversationModule),
        ],
        controllers: [user_blocks_controller_1.UserBlocksController],
        providers: [
            config_1.ConfigService,
            user_blocks_data_1.UserBlocksData,
            user_blocks_logic_1.UserBlocksLogic,
        ],
        exports: [user_blocks_logic_1.UserBlocksLogic],
    })
], UserBlocksModule);
exports.UserBlocksModule = UserBlocksModule;
//# sourceMappingURL=user-blocks.module.js.map
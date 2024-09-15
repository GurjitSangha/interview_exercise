"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const message_module_1 = require("../message/message.module");
const conversation_module_1 = require("../conversation/conversation.module");
const permissions_service_1 = require("./permissions.service");
const ability_factory_1 = require("./ability-factory");
const user_blocks_module_1 = require("../user-blocks/user-blocks.module");
let PermissionsModule = class PermissionsModule {
};
PermissionsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => conversation_module_1.ConversationModule),
            (0, common_1.forwardRef)(() => message_module_1.MessageModule),
            user_blocks_module_1.UserBlocksModule,
        ],
        providers: [permissions_service_1.PermissionsService, ability_factory_1.AbilityFactory],
        exports: [permissions_service_1.PermissionsService],
    })
], PermissionsModule);
exports.PermissionsModule = PermissionsModule;
//# sourceMappingURL=permissions.module.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const configuration_manager_module_1 = require("../configuration/configuration-manager.module");
const cache_manager_module_1 = require("../cache-manager/cache-manager.module");
const user_service_1 = require("./user.service");
let UserModule = class UserModule {
};
UserModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [cache_manager_module_1.CacheManagerModule, configuration_manager_module_1.ConfigManagerModule],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map
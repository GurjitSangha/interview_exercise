"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigManagerModule = exports.loadConfig = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const configuration_manager_1 = require("./configuration-manager");
const configuration_manager_utils_1 = require("./configuration-manager.utils");
async function loadConfig() {
    // Local config
    return (0, configuration_manager_utils_1.getLocalConfig)();
}
exports.loadConfig = loadConfig;
const configProvider = {
    provide: 'CONFIG',
    useFactory: () => loadConfig(),
};
let ConfigManagerModule = class ConfigManagerModule {
};
ConfigManagerModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [configProvider, configuration_manager_1.ConfigurationManager],
        exports: [configuration_manager_1.ConfigurationManager],
    })
], ConfigManagerModule);
exports.ConfigManagerModule = ConfigManagerModule;
//# sourceMappingURL=configuration-manager.module.js.map
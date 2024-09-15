"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockedConfigurationManager = exports.ConfigurationManager = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const configuration_manager_utils_1 = require("./configuration-manager.utils");
let ConfigurationManager = class ConfigurationManager {
    constructor(config) {
        this.config = config;
        this.configuration = this.config;
    }
    getConfiguration() {
        return this.configuration;
    }
};
ConfigurationManager = tslib_1.__decorate([
    tslib_1.__param(0, (0, common_1.Inject)('CONFIG')),
    tslib_1.__metadata("design:paramtypes", [Object])
], ConfigurationManager);
exports.ConfigurationManager = ConfigurationManager;
class MockedConfigurationManager {
    constructor(configOverrides) {
        this.configOverrides = configOverrides;
        this.configuration = { ...(0, configuration_manager_utils_1.getLocalConfig)(), ...configOverrides };
    }
    getConfiguration() {
        return this.configuration;
    }
}
exports.MockedConfigurationManager = MockedConfigurationManager;
//# sourceMappingURL=configuration-manager.js.map
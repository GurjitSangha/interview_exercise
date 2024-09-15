"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XApiKeyGuard = exports.ApiKeyStrategy = void 0;
const tslib_1 = require("tslib");
const passport_headerapikey_1 = require("passport-headerapikey");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const configuration_manager_1 = require("../configuration/configuration-manager");
let ApiKeyStrategy = class ApiKeyStrategy extends (0, passport_1.PassportStrategy)(passport_headerapikey_1.HeaderAPIKeyStrategy, 'ApiKeyStrategy') {
    constructor(configurationManager) {
        super({ header: 'x-api-key', prefix: '' }, true, (apikey, done) => {
            const configApiKey = this.configurationManager.getConfiguration().auth.apiKeyForClients;
            const checkKey = apikey === configApiKey;
            if (!checkKey) {
                return done(null, false);
            }
            return done(null, true);
        });
        this.configurationManager = configurationManager;
    }
};
ApiKeyStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [configuration_manager_1.ConfigurationManager])
], ApiKeyStrategy);
exports.ApiKeyStrategy = ApiKeyStrategy;
let XApiKeyGuard = class XApiKeyGuard extends (0, passport_1.AuthGuard)('ApiKeyStrategy') {
};
XApiKeyGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], XApiKeyGuard);
exports.XApiKeyGuard = XApiKeyGuard;
//# sourceMappingURL=XApiKeyGuard.js.map
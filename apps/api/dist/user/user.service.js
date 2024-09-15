"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const humps_1 = tslib_1.__importDefault(require("humps"));
const common_1 = require("@nestjs/common");
const user_cache_manager_service_1 = require("../cache-manager/user-cache-manager.service");
const configuration_manager_1 = require("../configuration/configuration-manager");
let UserService = class UserService {
    constructor(configurationManager, userCacheManagerService) {
        this.configurationManager = configurationManager;
        this.userCacheManagerService = userCacheManagerService;
        this.requestFunction = async (key) => {
            const requestUrl = `${this.baseUrl}/api/v1/users/${key}`;
            const response = await (0, node_fetch_1.default)(requestUrl, {
                method: 'GET',
                headers: {
                    Authorization: this.token,
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const parsedResponse = await response.json();
                return humps_1.default.camelizeKeys(parsedResponse);
            }
            throw new Error(`User Service request failed with error type: ${response.status} and message: ${response.statusText}`);
        };
        const userServiceConfig = this.configurationManager.getConfiguration().userService;
        this.token = userServiceConfig.token;
        this.baseUrl = userServiceConfig.url;
    }
    async getUser(userId) {
        const response = await this.userCacheManagerService.getOrSet(userId, this.requestFunction);
        if (!response) {
            throw new Error('Could not find user in cache or get user from user service');
        }
        return response;
    }
};
UserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [configuration_manager_1.ConfigurationManager,
        user_cache_manager_service_1.UserCacheManagerService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
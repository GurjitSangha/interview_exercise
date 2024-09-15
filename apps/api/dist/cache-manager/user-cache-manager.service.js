"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCacheManagerService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const cache_manager_service_1 = require("./cache-manager.service");
const config_1 = require("@nestjs/config");
let UserCacheManagerService = class UserCacheManagerService extends cache_manager_service_1.CacheManagerService {
    constructor(cacheManager, configService) {
        super(cacheManager, configService);
        this.cacheName = 'user';
    }
};
UserCacheManagerService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    tslib_1.__metadata("design:paramtypes", [Object, config_1.ConfigService])
], UserCacheManagerService);
exports.UserCacheManagerService = UserCacheManagerService;
//# sourceMappingURL=user-cache-manager.service.js.map
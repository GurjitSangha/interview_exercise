"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationCacheManagerService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cache_manager_service_1 = require("./cache-manager.service");
let ConversationCacheManagerService = class ConversationCacheManagerService extends cache_manager_service_1.CacheManagerService {
    constructor(cacheManager, configService) {
        super(cacheManager, configService);
        this.cacheName = 'conversation';
    }
};
ConversationCacheManagerService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    tslib_1.__metadata("design:paramtypes", [Object, config_1.ConfigService])
], ConversationCacheManagerService);
exports.ConversationCacheManagerService = ConversationCacheManagerService;
//# sourceMappingURL=conversation-cache-manager.service.js.map
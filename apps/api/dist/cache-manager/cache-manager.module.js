"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheManagerModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cache_manager_redis_store_1 = tslib_1.__importDefault(require("cache-manager-redis-store"));
const conversation_cache_manager_service_1 = require("./conversation-cache-manager.service");
const user_cache_manager_service_1 = require("./user-cache-manager.service");
let CacheManagerModule = class CacheManagerModule {
};
CacheManagerModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            common_1.CacheModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    const config = configService.get('cache');
                    if (!config)
                        throw new Error('Could not find cache config');
                    return {
                        store: cache_manager_redis_store_1.default,
                        host: config.url,
                        port: config.port,
                        max: config.maxItems,
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [
            user_cache_manager_service_1.UserCacheManagerService,
            config_1.ConfigService,
            conversation_cache_manager_service_1.ConversationCacheManagerService,
        ],
        exports: [user_cache_manager_service_1.UserCacheManagerService, conversation_cache_manager_service_1.ConversationCacheManagerService],
    })
], CacheManagerModule);
exports.CacheManagerModule = CacheManagerModule;
//# sourceMappingURL=cache-manager.module.js.map
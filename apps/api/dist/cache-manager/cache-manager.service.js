"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheManagerService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let CacheManagerService = class CacheManagerService {
    constructor(cacheManager, configService) {
        var _a, _b;
        this.cacheManager = cacheManager;
        this.configService = configService;
        const serviceName = (_a = this.configService.get('cache')) === null || _a === void 0 ? void 0 : _a.name;
        const ttl = (_b = this.configService.get('cache')) === null || _b === void 0 ? void 0 : _b.ttl;
        if (serviceName === undefined || ttl === undefined) {
            throw new Error('Cache Manager Configuration does not exist');
        }
        this.ttl = ttl;
        this.serviceName = serviceName;
    }
    getKeyFormat(key) {
        return `${this.serviceName}-${this.cacheName}-${key}`;
    }
    async get(key) {
        const formattedKey = this.getKeyFormat(key);
        return await this.cacheManager.get(formattedKey);
    }
    async set(data, key) {
        const formattedKey = this.getKeyFormat(key);
        await this.cacheManager.set(formattedKey, data, { ttl: this.ttl });
    }
    async del(key) {
        const formattedKey = this.getKeyFormat(key);
        await this.cacheManager.del(formattedKey);
    }
    async getOrSet(key, request) {
        let response;
        response = await this.get(key);
        if (response) {
            return response;
        }
        response = await request(key);
        await this.set(response, key);
        return response;
    }
};
CacheManagerService = tslib_1.__decorate([
    tslib_1.__param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    tslib_1.__metadata("design:paramtypes", [Object, config_1.ConfigService])
], CacheManagerService);
exports.CacheManagerService = CacheManagerService;
//# sourceMappingURL=cache-manager.service.js.map
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
export declare abstract class CacheManagerService<CachedObject> {
    private cacheManager;
    private configService;
    private serviceName;
    private ttl;
    protected abstract cacheName: string;
    constructor(cacheManager: Cache, configService: ConfigService);
    getKeyFormat(key: string): string;
    get(key: string): Promise<CachedObject | undefined>;
    set(data: CachedObject, key: string): Promise<void>;
    del(key: string): Promise<void>;
    getOrSet(key: string, request: (key: string) => Promise<CachedObject>): Promise<CachedObject>;
}

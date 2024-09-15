import { Cache } from 'cache-manager';
import { User } from '../user/models/user.model';
import { CacheManagerService } from './cache-manager.service';
import { ConfigService } from '@nestjs/config';
export declare class UserCacheManagerService extends CacheManagerService<User> {
    protected cacheName: string;
    constructor(cacheManager: Cache, configService: ConfigService);
}

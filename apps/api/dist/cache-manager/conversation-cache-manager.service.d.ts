import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { CacheManagerService } from './cache-manager.service';
import { ChatConversationModel } from '../conversation/models/conversation.model';
export declare class ConversationCacheManagerService extends CacheManagerService<ChatConversationModel> {
    protected cacheName: string;
    constructor(cacheManager: Cache, configService: ConfigService);
}

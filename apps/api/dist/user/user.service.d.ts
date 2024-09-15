import { User } from './models/user.model';
import { UserCacheManagerService } from '../cache-manager/user-cache-manager.service';
import { ConfigurationManager } from '../configuration/configuration-manager';
export interface IUserService {
    getUser(userId: string): Promise<User>;
    requestFunction(key: string): Promise<any>;
}
export declare class UserService implements IUserService {
    private configurationManager;
    private userCacheManagerService;
    private token;
    private baseUrl;
    constructor(configurationManager: ConfigurationManager, userCacheManagerService: UserCacheManagerService);
    requestFunction: (key: string) => Promise<any>;
    getUser(userId: string): Promise<User>;
}

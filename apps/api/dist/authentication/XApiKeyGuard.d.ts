import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { ConfigurationManager } from '../configuration/configuration-manager';
/**
 * Type composed from referencing HeaderAPIKeyStrategy types
 */
export declare type PassportStrategyVerified = (err: Error | null, user?: boolean, info?: unknown) => void;
declare const ApiKeyStrategy_base: new (...args: any[]) => HeaderAPIKeyStrategy;
export declare class ApiKeyStrategy extends ApiKeyStrategy_base {
    private configurationManager;
    constructor(configurationManager: ConfigurationManager);
}
declare const XApiKeyGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class XApiKeyGuard extends XApiKeyGuard_base {
}
export {};

export declare function getEnv(name: string, defaultValue: string): string;
export declare function getEnv(name: string, defaultValue?: string): string | undefined;
export declare function parseBooleanFromString(name: string, defaultValue: boolean): boolean;
export interface IDatabaseConfig {
    connectionString: string;
}
export interface IServerConfig {
    port: number;
    env: string;
    serviceName: string;
}
export interface IAuthConfig {
    jwtSecret: string;
    apiKeyForClients: string;
}
export interface IPusherConfig {
    secretKey: string;
    appId: string;
    key: string;
    sendPusherMessages: boolean;
}
export interface IUserServiceConfig {
    url: string;
    token: string;
}
export interface ICacheManagerConfig {
    url: string;
    port: number;
    ttl: number;
    name: string;
    maxItems: number;
}
export interface IMigrationsConfig {
    allowMigrations: boolean;
}
export interface Configuration {
    auth: IAuthConfig;
    database: IDatabaseConfig;
    userService: IUserServiceConfig;
    pusher: IPusherConfig;
}
declare const _default: () => {
    server: IServerConfig;
    cache: ICacheManagerConfig;
    migrations: IMigrationsConfig;
};
export default _default;
export declare const loadUbEnv: (variableName: string) => void;
export interface TestConfiguration {
    database: IDatabaseConfig;
}

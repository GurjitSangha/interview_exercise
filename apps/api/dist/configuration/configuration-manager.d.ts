import { Configuration } from './configuration';
export interface IConfigurationManager {
    getConfiguration(): Configuration;
}
export declare class ConfigurationManager implements IConfigurationManager {
    private config;
    private configuration;
    constructor(config: Configuration);
    getConfiguration(): Configuration;
}
export declare class MockedConfigurationManager implements IConfigurationManager {
    private configOverrides?;
    private configuration;
    constructor(configOverrides?: Partial<Configuration> | undefined);
    getConfiguration(): Configuration;
}

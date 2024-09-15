import { IAuthenticatedUser } from './jwt.strategy';
interface IAuthConfig {
    jwtSecret: string;
}
export declare const configuration: () => {
    auth: IAuthConfig;
};
export declare class MockActor {
    action(authUser: IAuthenticatedUser): {
        id: string;
    };
}
export declare class AppModule {
}
export {};

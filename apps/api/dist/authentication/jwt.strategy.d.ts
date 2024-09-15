import { Strategy } from 'passport-jwt';
import { ObjectID } from 'mongodb';
import { ConfigurationManager } from '../configuration/configuration-manager';
export interface IUBJwt {
    identity: {
        user_id: string;
        account_role: string;
        university_id?: string;
        marketplace_id?: string;
    };
}
export interface IAuthenticatedUser {
    userId: ObjectID;
    accountRole: string;
    universityId?: ObjectID;
    marketplaceId?: ObjectID;
}
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(configManager: ConfigurationManager);
    validate(payload: IUBJwt): Promise<IAuthenticatedUser>;
}
export declare const AuthenticatedUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
export {};

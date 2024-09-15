import { IAuthenticatedUser } from '../authentication/jwt.strategy';
export declare type ContextType = {
    req: {
        user: IAuthenticatedUser;
    };
};
export declare const getUserFromGqlContext: (context: ContextType) => IAuthenticatedUser;

export declare class UserField {
    id?: string;
}
export declare class User extends UserField {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePhoto?: string;
    accountRole?: string;
}
export declare type MessageSender = Omit<User, 'email' | 'lastName'>;

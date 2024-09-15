import { Action, Subject } from './../../permissions/models/permissions.model';
export declare const DirectConversationDefaultPermissions: ({
    action: Action;
    subject: Subject;
    conditions: {
        userId: {
            $in: string;
            $nin: string;
            $eq?: undefined;
        };
        universityId?: undefined;
    };
} | {
    action: Action;
    subject: Subject;
    conditions: {
        userId: {
            $eq: string;
            $nin: string;
            $in?: undefined;
        };
        universityId?: undefined;
    };
} | {
    action: Action;
    subject: Subject;
    conditions: {
        universityId: {
            $in: string;
        };
        userId?: undefined;
    };
})[];

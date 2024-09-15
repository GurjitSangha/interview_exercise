import { Action, Conditions, Subject } from '../../permissions/models/permissions.model';
export declare class Permission {
    action: Action;
    subject: Subject;
    conditions?: Conditions;
}

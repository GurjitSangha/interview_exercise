import { ObjectId } from 'mongodb';
export declare enum Product {
    virtualEvent = "virtualEvent",
    community = "community"
}
export declare enum ContextType {
    university = "university",
    isDirectConversation = "isDirectConversation",
    isNewsFeedConversation = "isNewsFeedConversation"
}
export declare type ContextIdType = string | Product | boolean | ObjectId;
export declare class Context {
    id: string;
    type: ContextType;
}
export declare class ContextSchema {
    constructor(id: ContextIdType, type: ContextType);
    id: ContextIdType;
    type: ContextType;
}

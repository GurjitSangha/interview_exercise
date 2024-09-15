import { BaseEventType, Channel, SocketsService } from '../sockets/sockets.service';
import { SocketChatMessage } from '../message/models/message.entity';
import { ObjectId } from 'mongodb';
import { User } from '../user/models/user.model';
export declare class SendMessageEvent implements BaseEventType {
    message: SocketChatMessage;
    name: string;
    constructor(message: SocketChatMessage);
}
export declare class DeleteMessageEvent implements BaseEventType {
    message: {
        id: ObjectId;
    };
    name: string;
    constructor(message: {
        id: ObjectId;
    });
}
export declare class LikeMessageEvent implements BaseEventType {
    message: {
        userId: ObjectId;
        messageId: ObjectId;
    };
    name: string;
    constructor(message: {
        userId: ObjectId;
        messageId: ObjectId;
    });
}
export declare class UnlikeMessageEvent implements BaseEventType {
    message: {
        userId: ObjectId;
        messageId: ObjectId;
    };
    name: string;
    constructor(message: {
        userId: ObjectId;
        messageId: ObjectId;
    });
}
export declare class ReactedMessageEvent implements BaseEventType {
    message: {
        userId: ObjectId;
        messageId: ObjectId;
        reaction: string;
        reactionUnicode: string;
    };
    name: string;
    constructor(message: {
        userId: ObjectId;
        messageId: ObjectId;
        reaction: string;
        reactionUnicode: string;
    });
}
export declare class UnReactedMessageEvent implements BaseEventType {
    message: {
        userId: ObjectId;
        messageId: ObjectId;
        reaction: string;
        reactionUnicode: string;
    };
    name: string;
    constructor(message: {
        userId: ObjectId;
        messageId: ObjectId;
        reaction: string;
        reactionUnicode: string;
    });
}
export declare class ResolveMessageEvent implements BaseEventType {
    message: {
        id: ObjectId;
    };
    name: string;
    constructor(message: {
        id: ObjectId;
    });
}
export declare class UnresolveMessageEvent implements BaseEventType {
    message: {
        id: ObjectId;
    };
    name: string;
    constructor(message: {
        id: ObjectId;
    });
}
export declare class PinMessageEvent implements BaseEventType {
    message: {
        id: ObjectId;
        message: SocketChatMessage;
    };
    name: string;
    constructor(message: {
        id: ObjectId;
        message: SocketChatMessage;
    });
}
export declare class UnpinMessageEvent implements BaseEventType {
    message: {
        id: ObjectId;
    };
    name: string;
    constructor(message: {
        id: ObjectId;
    });
}
export declare class UserLeftConversationEvent implements BaseEventType {
    message: User;
    name: string;
    constructor(message: User);
}
export declare class UserJoinedConversationEvent implements BaseEventType {
    message: User;
    name: string;
    constructor(message: User);
}
declare type EventType = SendMessageEvent | DeleteMessageEvent | LikeMessageEvent | UnlikeMessageEvent | PinMessageEvent | UnpinMessageEvent | UserLeftConversationEvent | UserJoinedConversationEvent;
export declare class ConversationChannel extends Channel<EventType> {
    protected socketClient: SocketsService;
    constructor(socketClient: SocketsService);
}
export {};

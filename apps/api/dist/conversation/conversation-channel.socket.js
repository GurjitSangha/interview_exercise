"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationChannel = exports.UserJoinedConversationEvent = exports.UserLeftConversationEvent = exports.UnpinMessageEvent = exports.PinMessageEvent = exports.UnresolveMessageEvent = exports.ResolveMessageEvent = exports.UnReactedMessageEvent = exports.ReactedMessageEvent = exports.UnlikeMessageEvent = exports.LikeMessageEvent = exports.DeleteMessageEvent = exports.SendMessageEvent = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const sockets_service_1 = require("../sockets/sockets.service");
class SendMessageEvent {
    constructor(message) {
        this.message = message;
        this.name = 'send-message';
    }
}
exports.SendMessageEvent = SendMessageEvent;
class DeleteMessageEvent {
    constructor(message) {
        this.message = message;
        this.name = 'delete-message';
    }
}
exports.DeleteMessageEvent = DeleteMessageEvent;
class LikeMessageEvent {
    constructor(message) {
        this.message = message;
        this.name = 'like-message';
    }
}
exports.LikeMessageEvent = LikeMessageEvent;
class UnlikeMessageEvent {
    constructor(message) {
        this.message = message;
        this.name = 'unlike-message';
    }
}
exports.UnlikeMessageEvent = UnlikeMessageEvent;
class ReactedMessageEvent {
    constructor(message) {
        this.message = message;
        this.name = 'reacted-message';
    }
}
exports.ReactedMessageEvent = ReactedMessageEvent;
class UnReactedMessageEvent {
    constructor(message) {
        this.message = message;
        this.name = 'unreacted-message';
    }
}
exports.UnReactedMessageEvent = UnReactedMessageEvent;
class ResolveMessageEvent {
    constructor(message) {
        this.message = message;
        this.name = 'resolve-message';
    }
}
exports.ResolveMessageEvent = ResolveMessageEvent;
class UnresolveMessageEvent {
    constructor(message) {
        this.message = message;
        this.name = 'unresolve-message';
    }
}
exports.UnresolveMessageEvent = UnresolveMessageEvent;
class PinMessageEvent {
    constructor(message) {
        this.message = message;
        this.name = 'pin-message';
    }
}
exports.PinMessageEvent = PinMessageEvent;
class UnpinMessageEvent {
    constructor(message) {
        this.message = message;
        this.name = 'unpin-message';
    }
}
exports.UnpinMessageEvent = UnpinMessageEvent;
class UserLeftConversationEvent {
    constructor(message) {
        this.message = message;
        this.name = 'user-left-conversation';
    }
}
exports.UserLeftConversationEvent = UserLeftConversationEvent;
class UserJoinedConversationEvent {
    constructor(message) {
        this.message = message;
        this.name = 'user-joined-conversation';
    }
}
exports.UserJoinedConversationEvent = UserJoinedConversationEvent;
let ConversationChannel = class ConversationChannel extends sockets_service_1.Channel {
    constructor(socketClient) {
        super('conversation', true, socketClient);
        this.socketClient = socketClient;
    }
};
ConversationChannel = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [sockets_service_1.SocketsService])
], ConversationChannel);
exports.ConversationChannel = ConversationChannel;
//# sourceMappingURL=conversation-channel.socket.js.map
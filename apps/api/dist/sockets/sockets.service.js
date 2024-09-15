"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = exports.SocketsService = void 0;
const tslib_1 = require("tslib");
const pusher_1 = tslib_1.__importDefault(require("pusher"));
const common_1 = require("@nestjs/common");
const configuration_manager_1 = require("../configuration/configuration-manager");
let SocketsService = class SocketsService {
    constructor(configurationManager) {
        this.configurationManager = configurationManager;
        this.pusherConfig = this.configurationManager.getConfiguration().pusher;
        this.pusher = new pusher_1.default({
            appId: this.pusherConfig.appId,
            key: this.pusherConfig.key,
            secret: this.pusherConfig.secretKey,
            cluster: 'eu',
            useTLS: true,
        });
    }
    send(data) {
        if (this.pusherConfig.sendPusherMessages) {
            this.pusher.trigger(data.channel, data.event, data.message);
        }
    }
    getFormattedName(channelName, isPrivate = false) {
        return isPrivate ? `private-${channelName}` : channelName;
    }
};
SocketsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [configuration_manager_1.ConfigurationManager])
], SocketsService);
exports.SocketsService = SocketsService;
class Channel {
    constructor(name, isPrivate = false, socketClient) {
        this.name = name;
        this.isPrivate = isPrivate;
        this.socketClient = socketClient;
    }
    getName(channelId) {
        return `${this.socketClient.getFormattedName(this.name, this.isPrivate)}-${channelId}`;
    }
    send(event, channelId) {
        this.socketClient.send({
            channel: this.getName(channelId),
            event: event.name,
            message: JSON.stringify(event.message),
        });
    }
}
exports.Channel = Channel;
//# sourceMappingURL=sockets.service.js.map
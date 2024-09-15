"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessageDataLoader = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const loader_1 = require("../utils/loader");
const message_logic_1 = require("./message.logic");
let ChatMessageDataLoader = class ChatMessageDataLoader extends loader_1.Loader {
    constructor(messageLogic) {
        super(messageLogic, {
            text: 'Error displaying message',
            sender: { id: '' },
            likes: [],
            likesCount: 0,
            created: new Date(),
            deleted: false,
            resolved: false,
        });
    }
};
ChatMessageDataLoader = tslib_1.__decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    tslib_1.__metadata("design:paramtypes", [message_logic_1.MessageLogic])
], ChatMessageDataLoader);
exports.ChatMessageDataLoader = ChatMessageDataLoader;
//# sourceMappingURL=message.dataloader.js.map
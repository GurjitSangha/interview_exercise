"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationInboxModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const conversation_inbox_resolver_1 = require("./conversation-inbox.resolver");
const conversation_module_1 = require("../conversation/conversation.module");
let ConversationInboxModule = class ConversationInboxModule {
};
ConversationInboxModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [conversation_module_1.ConversationModule],
        providers: [conversation_inbox_resolver_1.ConversationInboxResolver],
    })
], ConversationInboxModule);
exports.ConversationInboxModule = ConversationInboxModule;
//# sourceMappingURL=conversation-inbox.module.js.map
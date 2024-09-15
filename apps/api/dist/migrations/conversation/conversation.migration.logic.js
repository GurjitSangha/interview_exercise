"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationMigrationLogic = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const conversation_migration_data_1 = require("./conversation.migration.data");
let ConversationMigrationLogic = class ConversationMigrationLogic {
    constructor(conversationMigrationData) {
        this.conversationMigrationData = conversationMigrationData;
    }
    async migrateLastMessagesForEveryConversation() {
        return this.conversationMigrationData.migrateLastMessagesForEveryConversation();
    }
};
ConversationMigrationLogic = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [conversation_migration_data_1.ConversationMigrationData])
], ConversationMigrationLogic);
exports.ConversationMigrationLogic = ConversationMigrationLogic;
//# sourceMappingURL=conversation.migration.logic.js.map
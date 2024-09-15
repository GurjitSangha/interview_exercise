"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conditions = exports.ConditionField = exports.AccountRole = exports.Action = exports.Subject = void 0;
const tslib_1 = require("tslib");
const eager_import_0 = require("./permissions.model");
const swagger_1 = require("@nestjs/swagger");
var Subject;
(function (Subject) {
    Subject["user"] = "User";
    Subject["all"] = "all";
})(Subject = exports.Subject || (exports.Subject = {}));
var Action;
(function (Action) {
    Action["manage"] = "manage";
    Action["readConversation"] = "readConversation";
    Action["sendMessage"] = "sendMessage";
    Action["updateMessage"] = "updateMessage";
    Action["deleteMessage"] = "deleteMessage";
    Action["resolveMessage"] = "resolveMessage";
    Action["pinMessage"] = "pinMessage";
    Action["createPoll"] = "createPoll";
})(Action = exports.Action || (exports.Action = {}));
var AccountRole;
(function (AccountRole) {
    AccountRole["applicant"] = "applicant";
    AccountRole["mentor"] = "mentor";
    AccountRole["staff"] = "staff";
    AccountRole["university"] = "university";
    AccountRole["admin"] = "admin";
})(AccountRole = exports.AccountRole || (exports.AccountRole = {}));
var ConditionField;
(function (ConditionField) {
    ConditionField["messageSenderId"] = "message.senderId";
    ConditionField["conversationMemberIds"] = "conversation.memberIds";
    ConditionField["conversationBlockedMemberIds"] = "conversation.blockedMemberIds";
    ConditionField["conversationUniversityIds"] = "conversation.universityIds";
})(ConditionField = exports.ConditionField || (exports.ConditionField = {}));
class Conditions {
    static _GRAPHQL_METADATA_FACTORY() {
        return { userId: { nullable: true, type: () => Object }, universityId: { nullable: true, type: () => Object }, accountRole: { nullable: true, type: () => require("./permissions.model").AccountRole } };
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    tslib_1.__metadata("design:type", Object)
], Conditions.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    tslib_1.__metadata("design:type", Object)
], Conditions.prototype, "universityId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: AccountRole }),
    tslib_1.__metadata("design:type", String)
], Conditions.prototype, "accountRole", void 0);
exports.Conditions = Conditions;
//# sourceMappingURL=permissions.model.js.map
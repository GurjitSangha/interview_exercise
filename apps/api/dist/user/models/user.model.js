"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserField = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
let UserField = class UserField {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { nullable: true, type: () => String } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Directive)('@external'),
    tslib_1.__metadata("design:type", String)
], UserField.prototype, "id", void 0);
UserField = tslib_1.__decorate([
    (0, graphql_1.ObjectType)(),
    (0, graphql_1.Directive)('@extends'),
    (0, graphql_1.Directive)('@key(fields: "id")')
], UserField);
exports.UserField = UserField;
class User extends UserField {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => String }, email: { type: () => String }, firstName: { type: () => String }, lastName: { type: () => String }, profilePhoto: { nullable: true, type: () => String }, accountRole: { nullable: true, type: () => String } };
    }
}
exports.User = User;
//# sourceMappingURL=user.model.js.map
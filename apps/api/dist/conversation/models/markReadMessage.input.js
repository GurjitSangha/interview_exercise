"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkReadMessageDTO = void 0;
const tslib_1 = require("tslib");
const eager_import_0 = require("bson");
const graphql_1 = require("@nestjs/graphql");
let MarkReadMessageDTO = class MarkReadMessageDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { conversationId: { type: () => String }, messageId: { type: () => require("bson").ObjectId } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", String)
], MarkReadMessageDTO.prototype, "conversationId", void 0);
MarkReadMessageDTO = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], MarkReadMessageDTO);
exports.MarkReadMessageDTO = MarkReadMessageDTO;
//# sourceMappingURL=markReadMessage.input.js.map
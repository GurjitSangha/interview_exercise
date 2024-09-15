"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpinMessageDTO = exports.pinMessageDTO = void 0;
const tslib_1 = require("tslib");
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const mongodb_1 = require("mongodb");
let pinMessageDTO = class pinMessageDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { messageId: { required: true, type: () => require("bson").ObjectId }, conversationId: { required: true, type: () => String } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], pinMessageDTO.prototype, "messageId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], pinMessageDTO.prototype, "conversationId", void 0);
pinMessageDTO = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], pinMessageDTO);
exports.pinMessageDTO = pinMessageDTO;
let unpinMessageDTO = class unpinMessageDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { messageId: { required: true, type: () => require("bson").ObjectId }, conversationId: { required: true, type: () => String } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectID)
], unpinMessageDTO.prototype, "messageId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], unpinMessageDTO.prototype, "conversationId", void 0);
unpinMessageDTO = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], unpinMessageDTO);
exports.unpinMessageDTO = unpinMessageDTO;
//# sourceMappingURL=pinnedMessages.dto.js.map
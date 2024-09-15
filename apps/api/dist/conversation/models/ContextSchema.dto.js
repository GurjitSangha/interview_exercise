"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextSchema = exports.Context = exports.ContextType = exports.Product = void 0;
const tslib_1 = require("tslib");
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("@nestjs/mongoose");
var Product;
(function (Product) {
    Product["virtualEvent"] = "virtualEvent";
    Product["community"] = "community";
})(Product = exports.Product || (exports.Product = {}));
var ContextType;
(function (ContextType) {
    ContextType["university"] = "university";
    ContextType["isDirectConversation"] = "isDirectConversation";
    ContextType["isNewsFeedConversation"] = "isNewsFeedConversation";
})(ContextType = exports.ContextType || (exports.ContextType = {}));
(0, graphql_1.registerEnumType)(ContextType, {
    name: 'ContextType',
});
let Context = class Context {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, type: { required: true, enum: require("./ContextSchema.dto").ContextType } };
    }
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Context.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => ContextType),
    (0, swagger_1.ApiProperty)({ enum: ContextType }),
    tslib_1.__metadata("design:type", String)
], Context.prototype, "type", void 0);
Context = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], Context);
exports.Context = Context;
// This is for DB schema and shouldn't be used for data input or as response on graph/API
class ContextSchema {
    constructor(id, type) {
        this.id = id;
        this.type = type;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Object }, type: { required: true, enum: require("./ContextSchema.dto").ContextType } };
    }
}
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    tslib_1.__metadata("design:type", Object)
], ContextSchema.prototype, "id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        enum: ContextType,
    }),
    tslib_1.__metadata("design:type", String)
], ContextSchema.prototype, "type", void 0);
exports.ContextSchema = ContextSchema;
//# sourceMappingURL=ContextSchema.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectIDScalar = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
const mongodb_1 = require("mongodb");
const graphql_3 = require("graphql");
const converters_utils_1 = require("../utils/converters.utils");
// TODO: make this a package
const MONGODB_OBJECTID_REGEX = /^[0-9a-fA-F]{24}$/;
let ObjectIDScalar = class ObjectIDScalar {
    constructor() {
        this.description = 'ObjectId custom scalar type';
    }
    serialize(value) {
        return (0, converters_utils_1.str)(value);
    }
    parseValue(value) {
        if (!MONGODB_OBJECTID_REGEX.test(value)) {
            throw new TypeError(`Value is not a valid mongodb object id of form: ${value}`);
        }
        return new mongodb_1.ObjectID(value);
    }
    parseLiteral(ast) {
        if (ast.kind !== graphql_2.Kind.STRING) {
            throw new graphql_3.GraphQLError(`Can only validate strings as mongodb object id but got a: ${ast.kind}`);
        }
        if (!MONGODB_OBJECTID_REGEX.test(ast.value)) {
            throw new TypeError(`Value is not a valid mongodb object id of form: ${ast.value}`);
        }
        return new mongodb_1.ObjectID(ast.value);
    }
};
ObjectIDScalar = tslib_1.__decorate([
    (0, graphql_1.Scalar)('ObjectId', () => mongodb_1.ObjectID)
], ObjectIDScalar);
exports.ObjectIDScalar = ObjectIDScalar;
//# sourceMappingURL=objectId.scalar.js.map
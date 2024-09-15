"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.str = void 0;
const mongodb_1 = require("mongodb");
const str = (value) => {
    if (value instanceof mongodb_1.ObjectID) {
        return value.toHexString();
    }
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return `${value}`;
};
exports.str = str;
//# sourceMappingURL=converters.utils.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScalarsModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const objectId_scalar_1 = require("./objectId.scalar");
let ScalarsModule = class ScalarsModule {
};
ScalarsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [objectId_scalar_1.ObjectIDScalar],
    })
], ScalarsModule);
exports.ScalarsModule = ScalarsModule;
//# sourceMappingURL=scalars.module.js.map
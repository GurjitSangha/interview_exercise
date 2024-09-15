"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafeguardingModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const languagedetect_1 = tslib_1.__importDefault(require("languagedetect"));
const language_detection_service_1 = require("./language-detection.service");
const safeguarding_service_1 = require("./safeguarding.service");
let SafeguardingModule = class SafeguardingModule {
};
SafeguardingModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [safeguarding_service_1.SafeguardingService, language_detection_service_1.LanguageDetectionService, languagedetect_1.default],
        exports: [safeguarding_service_1.SafeguardingService],
    })
], SafeguardingModule);
exports.SafeguardingModule = SafeguardingModule;
//# sourceMappingURL=safeguarding.module.js.map
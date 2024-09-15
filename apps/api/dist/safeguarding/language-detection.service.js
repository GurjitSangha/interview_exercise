"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageDetectionService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const languagedetect_1 = tslib_1.__importDefault(require("languagedetect"));
const languages_1 = require("../enums/languages");
let LanguageDetectionService = class LanguageDetectionService {
    constructor(languageDetect) {
        this.languageDetect = languageDetect;
    }
    detectLanguage(message) {
        let language = languages_1.DEFAULT_LANGUAGE;
        let key = language.toUpperCase();
        const result = this.languageDetect.detect(message, 1);
        if (result[0] && result[0][0]) {
            language = result[0][0];
            key = language.toUpperCase();
            if (!Object.keys(languages_1.Languages).includes(key)) {
                return languages_1.Languages.ENGLISH;
            }
        }
        return languages_1.Languages[key];
    }
};
LanguageDetectionService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [languagedetect_1.default])
], LanguageDetectionService);
exports.LanguageDetectionService = LanguageDetectionService;
//# sourceMappingURL=language-detection.service.js.map
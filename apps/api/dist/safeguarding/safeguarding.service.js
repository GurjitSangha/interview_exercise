"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafeguardingService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const badwords_list_1 = tslib_1.__importDefault(require("badwords-list"));
const string_utils_1 = require("../utils/string.utils");
const language_detection_service_1 = require("./language-detection.service");
const whitelisted_words_1 = require("./whitelisted-words");
let SafeguardingService = class SafeguardingService {
    constructor(languageDetect) {
        this.languageDetect = languageDetect;
    }
    clean(message) {
        const whitelistSet = whitelisted_words_1.whiteListedSet[this.languageDetect.detectLanguage(message)];
        const hashMap = new Map();
        // replace whitelisted words into hash
        if (whitelistSet) {
            message = message.replace(whitelistSet, (substring) => {
                const hash = String((0, string_utils_1.hashCode)(substring));
                hashMap.set(hash, substring);
                return hash;
            });
        }
        message = message.replace(badwords_list_1.default.regex, '🤬'); // censor english offensive words
        // replace the hash to whitelist words
        if (whitelistSet) {
            return message.replace(/([0-9]+)/g, (substring) => {
                const hash = hashMap.get(substring);
                return hash ? hash : substring;
            });
        }
        return message;
    }
};
SafeguardingService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [language_detection_service_1.LanguageDetectionService])
], SafeguardingService);
exports.SafeguardingService = SafeguardingService;
//# sourceMappingURL=safeguarding.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniversityContexts = exports.extractUniversityIdsFromContext = void 0;
const ContextSchema_dto_1 = require("./models/ContextSchema.dto");
function extractUniversityIdsFromContext({ conversationContext, }) {
    return getUniversityContexts(conversationContext).map(({ id }) => id);
}
exports.extractUniversityIdsFromContext = extractUniversityIdsFromContext;
function getUniversityContexts(conversationContext) {
    return conversationContext.filter((context) => context.type === ContextSchema_dto_1.ContextType.university && typeof context.id === 'string');
}
exports.getUniversityContexts = getUniversityContexts;
//# sourceMappingURL=extractUniversityIdsFromContext.js.map
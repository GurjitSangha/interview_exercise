"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const configuration_manager_utils_1 = require("../configuration/configuration-manager.utils");
const arg_1 = tslib_1.__importDefault(require("arg"));
/**
 * Arguments
 */
const args = (0, arg_1.default)({
    // Types
    '--userId': String,
    '--accountRole': String,
    '--universityId': String,
});
/**
 * Default arguments
 */
const userId = args['--userId'] || '599ebd736a1d100004aeb744';
const accountRole = args['--accountRole'] || 'university';
const universityId = args['--universityId'] || '599ccb2f0248050004a484e8';
/**
 * Signs and generates a JWT
 * @param userId The userId of the auth user
 * @param accountRole The accountRole of the auth user
 * @param universityId The universityId of the auth user
 * @returns {string} The signed JWT
 */
function generateToken(userId, accountRole, universityId) {
    const payload = {
        identity: {
            user_id: userId,
            account_role: accountRole,
            university_id: universityId,
        },
    };
    const token = jsonwebtoken_1.default.sign(payload, (0, configuration_manager_utils_1.getLocalConfig)().auth.jwtSecret, {});
    return token;
}
/**
 * Main run
 */
const token = generateToken(userId, accountRole, universityId);
console.log('\n\nTOKEN ===', token);
//# sourceMappingURL=generateToken.js.map
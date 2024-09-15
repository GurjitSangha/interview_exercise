"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatedUser = exports.JwtStrategy = void 0;
const tslib_1 = require("tslib");
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const common_2 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const configuration_manager_1 = require("../configuration/configuration-manager");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configManager) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme('JWT'),
            ignoreExpiration: false,
            secretOrKey: configManager.getConfiguration().auth.jwtSecret,
        });
    }
    async validate(payload) {
        const { identity } = payload;
        console.log({ identity });
        return {
            userId: new mongodb_1.ObjectID(identity.user_id),
            accountRole: identity.account_role,
            universityId: identity.university_id
                ? new mongodb_1.ObjectID(identity.university_id)
                : undefined,
            marketplaceId: identity.marketplace_id
                ? new mongodb_1.ObjectID(identity.marketplace_id)
                : undefined,
        };
    }
};
JwtStrategy = tslib_1.__decorate([
    (0, common_2.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [configuration_manager_1.ConfigurationManager])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
exports.AuthenticatedUser = (0, common_1.createParamDecorator)((data, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
});
//# sourceMappingURL=jwt.strategy.js.map
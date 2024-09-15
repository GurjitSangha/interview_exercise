"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GqlAuthGuardForReference = exports.GqlAuthGuard = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const graphql_1 = require("@nestjs/graphql");
const apollo_server_express_1 = require("apollo-server-express");
let GqlAuthGuard = class GqlAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    // we override this method because we need the extensions.code value to match in
    // the Apollo Gateway so that we're correctly throwing a 401
    // https://github.com/Unibuddy/apollo-gateway/blob/51cce2d8f010dce82dc3688211ecb0d3e621320e/index.js#L68
    async canActivate(context) {
        let result;
        try {
            result = (await super.canActivate(context));
        }
        catch (e) {
            console.log(e);
            throw new apollo_server_express_1.AuthenticationError('UNAUTHENTICATED');
        }
        return Promise.resolve(result);
    }
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
};
GqlAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], GqlAuthGuard);
exports.GqlAuthGuard = GqlAuthGuard;
let GqlAuthGuardForReference = class GqlAuthGuardForReference extends (0, passport_1.AuthGuard)('jwt') {
    getRequest(context) {
        /*
         * A GqlExecutionContext typically expects 4 args in ExecutionContext.
         * However, in a @ResolveReference context, there are 3 args: `reference`, `context`, and `info`.
         * (See https://www.apollographql.com/docs/federation/api/apollo-federation/#parameters-1)
         *
         * This causes a problem, because GqlExecutionContext expects the first argument to be
         * the value of the `rootValue` function. (See https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-arguments)
         *
         * So, in a hacky maneuver, we fix the args indices for the @ResolveReference scenario by shifting them one to the right.
         */
        if (context.getArgs().length < 4) {
            context.getArgs().splice(1, 0, {});
        }
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
};
GqlAuthGuardForReference = tslib_1.__decorate([
    (0, common_1.Injectable)()
], GqlAuthGuardForReference);
exports.GqlAuthGuardForReference = GqlAuthGuardForReference;
//# sourceMappingURL=GqlAuthGuard.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.MockActor = exports.configuration = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const GqlAuthGuard_1 = require("./GqlAuthGuard");
const jwt_strategy_1 = require("./jwt.strategy");
const configuration_manager_1 = require("../configuration/configuration-manager");
const configuration = () => ({
    auth: {
        jwtSecret: 'sshhhhhhhhhhhhhhh!',
    },
});
exports.configuration = configuration;
let Book = class Book {
};
tslib_1.__decorate([
    (0, graphql_1.Field)(),
    tslib_1.__metadata("design:type", String)
], Book.prototype, "id", void 0);
Book = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], Book);
let MockActor = class MockActor {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    action(authUser) {
        return { id: '123' };
    }
};
MockActor = tslib_1.__decorate([
    (0, common_1.Injectable)()
], MockActor);
exports.MockActor = MockActor;
let MockResolver = class MockResolver {
    constructor(mockActor) {
        this.mockActor = mockActor;
    }
    async createBook() {
        return {
            id: '123',
        };
    }
    async guardedCreateBook() {
        return {
            id: '123',
        };
    }
    async bookWithUser(authenticatedUser) {
        return this.mockActor.action(authenticatedUser);
    }
};
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => Book),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], MockResolver.prototype, "createBook", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => Book),
    (0, common_1.UseGuards)(GqlAuthGuard_1.GqlAuthGuard),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], MockResolver.prototype, "guardedCreateBook", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => Book),
    (0, common_1.UseGuards)(GqlAuthGuard_1.GqlAuthGuard),
    tslib_1.__param(0, (0, jwt_strategy_1.AuthenticatedUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MockResolver.prototype, "bookWithUser", null);
MockResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(() => Book),
    tslib_1.__metadata("design:paramtypes", [MockActor])
], MockResolver);
let BookModule = class BookModule {
};
BookModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [MockResolver, MockActor],
    })
], BookModule);
let ConfigManagerModule = class ConfigManagerModule {
};
ConfigManagerModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [
            { provide: configuration_manager_1.ConfigurationManager, useClass: configuration_manager_1.MockedConfigurationManager },
        ],
        exports: [configuration_manager_1.ConfigurationManager],
    })
], ConfigManagerModule);
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            BookModule,
            graphql_1.GraphQLFederationModule.forRoot({
                autoSchemaFile: true,
            }),
            ConfigManagerModule,
        ],
        providers: [jwt_strategy_1.JwtStrategy],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=mock-server-with-auth.js.map
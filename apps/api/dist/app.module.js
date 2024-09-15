"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("@nestjs/mongoose");
const terminus_1 = require("@nestjs/terminus");
const path_1 = require("path");
const health_module_1 = require("./health/health.module");
const conversation_module_1 = require("./conversation/conversation.module");
const conversation_inbox_module_1 = require("./conversation-inbox/conversation-inbox.module");
const message_module_1 = require("./message/message.module");
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const configuration_1 = tslib_1.__importDefault(require("./configuration/configuration"));
const scalars_module_1 = require("./scalars/scalars.module");
const graphql_1 = require("@nestjs/graphql");
const config_1 = require("@nestjs/config");
const express_openapi_validator_1 = require("express-openapi-validator");
const XApiKeyGuard_1 = require("./authentication/XApiKeyGuard");
const exception_handler_1 = require("./exception/exception.handler");
const permissions_module_1 = require("./permissions/permissions.module");
const jwt_strategy_1 = require("./authentication/jwt.strategy");
const sockets_module_1 = require("./sockets/sockets.module");
const user_module_1 = require("./user/user.module");
const cache_manager_module_1 = require("./cache-manager/cache-manager.module");
const configuration_manager_module_1 = require("./configuration/configuration-manager.module");
const safeguarding_module_1 = require("./safeguarding/safeguarding.module");
const configuration_manager_1 = require("./configuration/configuration-manager");
const user_blocks_module_1 = require("./user-blocks/user-blocks.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply((0, morgan_1.default)('combined')).forRoutes('*');
        consumer
            .apply(...(0, express_openapi_validator_1.middleware)({
            apiSpec: `${process.cwd()}/openapi.json`,
            validateFormats: 'full',
            validateResponses: true,
        }))
            .exclude('graphql')
            .forRoutes('*');
    }
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            configuration_manager_module_1.ConfigManagerModule,
            terminus_1.TerminusModule,
            health_module_1.HealthModule,
            mongoose_1.MongooseModule.forRootAsync({
                imports: [configuration_manager_module_1.ConfigManagerModule],
                inject: [configuration_manager_1.ConfigurationManager],
                useFactory: (configurationManager) => {
                    const databaseConfig = configurationManager.getConfiguration().database;
                    return {
                        uri: databaseConfig.connectionString,
                    };
                },
            }),
            conversation_module_1.ConversationModule,
            conversation_inbox_module_1.ConversationInboxModule,
            message_module_1.MessageModule,
            scalars_module_1.ScalarsModule,
            graphql_1.GraphQLFederationModule.forRoot({
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                context: ({ req }) => ({ req }),
                buildSchemaOptions: {
                    numberScalarMode: 'integer',
                },
                introspection: true,
                fieldResolverEnhancers: ['guards'],
            }),
            config_1.ConfigModule.forRoot({
                ignoreEnvFile: true,
                load: [configuration_1.default],
            }),
            permissions_module_1.PermissionsModule,
            sockets_module_1.SocketsModule,
            user_module_1.UserModule,
            cache_manager_module_1.CacheManagerModule,
            safeguarding_module_1.SafeguardingModule,
            user_blocks_module_1.UserBlocksModule,
        ],
        providers: [
            XApiKeyGuard_1.ApiKeyStrategy,
            {
                provide: core_1.APP_FILTER,
                useClass: exception_handler_1.ExceptionsLoggerFilter,
            },
            jwt_strategy_1.JwtStrategy,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
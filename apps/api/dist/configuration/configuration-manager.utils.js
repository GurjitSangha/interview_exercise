"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestConfiguration = exports.getLocalConfig = void 0;
const configuration_1 = require("./configuration");
function getLocalConfig() {
    return {
        auth: {
            jwtSecret: (0, configuration_1.getEnv)('JWT_SECRET_KEY', 'ssssh'),
            apiKeyForClients: (0, configuration_1.getEnv)('API_KEY_FOR_CLIENT', 'ssssh'),
        },
        database: {
            connectionString: (0, configuration_1.getEnv)('MONGO_CONNECTION_STRING', 'mongodb://localadmin:localadmin@127.0.0.1:27017/unibuddy-chat-local?authSource=admin'),
        },
        userService: {
            url: (0, configuration_1.getEnv)('USER_SERVICE_URL', 'http://localhost:1080'),
            // Ensure that you have added this to your local env
            token: (0, configuration_1.getEnv)('UB_INTERNAL_API_KEY', 'ub_internal_api_key'),
        },
        pusher: {
            secretKey: (0, configuration_1.getEnv)('PUSHER_APP_SECRET', '1'),
            appId: (0, configuration_1.getEnv)('PUSHER_APP_ID', '1'),
            key: (0, configuration_1.getEnv)('PUSHER_APP_KEY', '1'),
            sendPusherMessages: (0, configuration_1.parseBooleanFromString)('PUSHER_APP_ENABLED', false),
        },
    };
}
exports.getLocalConfig = getLocalConfig;
function getTestConfiguration() {
    return {
        database: {
            connectionString: 'mongodb://localadmin:localadmin@127.0.0.1:27017/unibuddy-chat-local?authSource=admin',
        },
    };
}
exports.getTestConfiguration = getTestConfiguration;
//# sourceMappingURL=configuration-manager.utils.js.map
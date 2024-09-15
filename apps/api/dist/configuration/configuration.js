"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadUbEnv = exports.parseBooleanFromString = exports.getEnv = void 0;
function parseIntOrDefault(value, defaultValue) {
    return value !== undefined && value !== null ? parseInt(value) : defaultValue;
}
// Remember, the implementation doesn't count as one of the overloads.
// We could put "any" here but i don't want to confuse anymore that this
function getEnv(name, defaultValue) {
    const processValue = process.env[name];
    if (typeof processValue === 'undefined') {
        return defaultValue;
    }
    return processValue;
}
exports.getEnv = getEnv;
function parseBooleanFromString(name, defaultValue) {
    const value = getEnv(name);
    if (typeof value === 'undefined') {
        return defaultValue;
    }
    if (typeof value === 'boolean') {
        return value;
    }
    return value.toLowerCase() === 'true';
}
exports.parseBooleanFromString = parseBooleanFromString;
function getEnvInt(name, defaultValue) {
    const value = getEnv(name);
    if (value === undefined) {
        return defaultValue;
    }
    if (typeof value === 'number') {
        return value;
    }
    else {
        return parseInt(value);
    }
}
exports.default = () => ({
    server: {
        port: parseIntOrDefault(process.env.PORT, 3000),
        env: getEnv('UB_INSTANCE', 'local').toLowerCase(),
        serviceName: 'ub-chat-service',
    },
    cache: {
        url: getEnv('REDIS_URL', 'localhost'),
        port: getEnvInt('REDIS_PORT', 6379),
        ttl: getEnvInt('CACHE_TTL', 300),
        name: getEnv('CACHE_NAME', 'chat-service'),
        maxItems: getEnvInt('CACHE_MAX_ITEMS', 20000),
    },
    migrations: {
        allowMigrations: parseBooleanFromString('ALLOW_MIGRATIONS', true),
    },
});
const loadUbEnv = (variableName) => {
    const ubEnv = process.env[variableName] || '{}';
    const envVars = JSON.parse(ubEnv);
    for (const [key, value] of Object.entries(envVars)) {
        if (typeof process.env[key] === 'undefined') {
            process.env[key] = `${value}`;
        }
    }
};
exports.loadUbEnv = loadUbEnv;
//# sourceMappingURL=configuration.js.map
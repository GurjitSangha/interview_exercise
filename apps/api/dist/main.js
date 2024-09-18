"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const fs_1 = require("fs");
const path_1 = require("path");
const configuration_1 = require("./configuration/configuration");
async function bootstrap() {
    (0, configuration_1.loadUbEnv)('UB_CHAT_ENV_INJECT');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableShutdownHooks();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Chat service')
        .addApiKey({
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
        description: 'API Key For External calls',
    }, 'X-API-KEY')
        .setDescription('The chat REST API description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        deepScanRoutes: true,
    });
    app.enableCors({
        origin: 'http://localhost:5173',
    });
    (0, fs_1.writeFileSync)((0, path_1.join)(process.cwd(), './openapi.json'), JSON.stringify(document, null, 4));
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map
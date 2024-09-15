"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketsModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const configuration_manager_module_1 = require("../configuration/configuration-manager.module");
const sockets_service_1 = require("./sockets.service");
let SocketsModule = class SocketsModule {
};
SocketsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [configuration_manager_module_1.ConfigManagerModule],
        providers: [sockets_service_1.SocketsService],
        exports: [sockets_service_1.SocketsService],
    })
], SocketsModule);
exports.SocketsModule = SocketsModule;
//# sourceMappingURL=sockets.module.js.map
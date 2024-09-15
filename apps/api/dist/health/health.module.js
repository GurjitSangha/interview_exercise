"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const health_controller_1 = require("./health.controller");
const terminus_1 = require("@nestjs/terminus");
const service_health_1 = require("./service.health");
const mongoose_1 = require("@nestjs/mongoose");
let HealthModule = class HealthModule {
};
HealthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [health_controller_1.HealthController],
        imports: [terminus_1.TerminusModule, mongoose_1.MongooseModule],
        providers: [service_health_1.ServiceHealthIndicator],
    })
], HealthModule);
exports.HealthModule = HealthModule;
//# sourceMappingURL=health.module.js.map
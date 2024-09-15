"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const tslib_1 = require("tslib");
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const service_health_1 = require("./service.health");
let HealthController = class HealthController {
    constructor(health, service, mongoose) {
        this.health = health;
        this.service = service;
        this.mongoose = mongoose;
    }
    check() {
        return this.health.check([
            async () => this.service.check('chat-service'),
            async () => this.mongoose.pingCheck('database'),
        ]);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, terminus_1.HealthCheck)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], HealthController.prototype, "check", null);
HealthController = tslib_1.__decorate([
    (0, common_1.Controller)('health'),
    tslib_1.__metadata("design:paramtypes", [terminus_1.HealthCheckService,
        service_health_1.ServiceHealthIndicator,
        terminus_1.MongooseHealthIndicator])
], HealthController);
exports.HealthController = HealthController;
//# sourceMappingURL=health.controller.js.map
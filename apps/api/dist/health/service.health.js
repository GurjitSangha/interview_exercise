"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceHealthIndicator = void 0;
const terminus_1 = require("@nestjs/terminus");
class ServiceHealthIndicator extends terminus_1.HealthIndicator {
    check(key) {
        const isHealthy = true;
        return this.getStatus(key, isHealthy);
    }
}
exports.ServiceHealthIndicator = ServiceHealthIndicator;
//# sourceMappingURL=service.health.js.map
import { HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus';
import { ServiceHealthIndicator } from './service.health';
export declare class HealthController {
    private health;
    private service;
    private mongoose;
    constructor(health: HealthCheckService, service: ServiceHealthIndicator, mongoose: MongooseHealthIndicator);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}

import { HealthIndicator } from '@nestjs/terminus';
export declare class ServiceHealthIndicator extends HealthIndicator {
    check(key: string): import("@nestjs/terminus").HealthIndicatorResult;
}

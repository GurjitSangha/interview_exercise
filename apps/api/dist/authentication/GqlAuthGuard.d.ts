import { CanActivate, ExecutionContext } from '@nestjs/common';
declare const GqlAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class GqlAuthGuard extends GqlAuthGuard_base implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
    getRequest(context: ExecutionContext): any;
}
declare const GqlAuthGuardForReference_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class GqlAuthGuardForReference extends GqlAuthGuardForReference_base {
    getRequest(context: ExecutionContext): any;
}
export {};

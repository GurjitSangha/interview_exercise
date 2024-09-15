"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionsLoggerFilter = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const getExceptionCode = (exception) => {
    switch (exception.status) {
        case 400:
            return new common_1.HttpException(`Bad request: ${exception.message}`, 400);
        case 401:
            return new common_1.HttpException(`Unauthorized request: ${exception.message}`, 401);
        case 403:
            return new common_1.HttpException(`Forbidden: ${exception.message}`, 403);
        case 404:
            return new common_1.HttpException(`Resource not found: ${exception.message}`, 404);
        default:
            console.error(exception);
            return exception;
    }
};
let ExceptionsLoggerFilter = class ExceptionsLoggerFilter extends core_1.BaseExceptionFilter {
    catch(exception, host) {
        const type = host.getType();
        if (type === 'http') {
            return super.catch(getExceptionCode(exception), host);
        }
        else {
            console.error('Unhandled global exception', exception);
            throw exception;
        }
    }
};
ExceptionsLoggerFilter = tslib_1.__decorate([
    (0, common_1.Catch)()
], ExceptionsLoggerFilter);
exports.ExceptionsLoggerFilter = ExceptionsLoggerFilter;
//# sourceMappingURL=exception.handler.js.map
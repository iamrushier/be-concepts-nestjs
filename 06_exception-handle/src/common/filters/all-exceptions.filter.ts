// 06_exception-handle/src/common/filters/all-exceptions.filter.ts
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name)

    catch(exception: any, host: ArgumentsHost) {
        const context = host.switchToHttp()
        const request = context.getRequest<Request>()
        const response = context.getResponse<Response>()

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception instanceof HttpException ? exception.getResponse() : { message: "Internal Server Error" }

        if (!(exception instanceof HttpException)) {
            this.logger.error(
                `Unexpected error on ${request.method} ${request.url}`,
                exception instanceof Error ? exception.stack : String(exception)
            )
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: typeof message === "string" ? message : (message as any).message || message,
        })
    }
}
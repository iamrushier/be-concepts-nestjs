// 07_req-lifecycle-logger/src/common/middleware/logger.middleware.ts
import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger(LoggerMiddleware.name)

    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl } = req;
        const startTime = Date.now()

        this.logger.log(`-> ${method} ${originalUrl} started`)

        // Monkey-patch res.end() to log when response finishes
        const originalEnd = res.end // Save reference before monkey-patch
        res.end = (...args: any[]) => {
            const duration = Date.now() - startTime
            const status = (res as any).statusCode || 200
            this.logger.log(`<- ${method} ${originalUrl} finished - ${status} (${duration}ms)`)
            return originalEnd.apply(res, args) // Call function with Specified 'this'->'res', and 'args' array
        }
        next()
    }
}
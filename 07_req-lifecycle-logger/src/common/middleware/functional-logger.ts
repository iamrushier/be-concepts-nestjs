// 07_req-lifecycle-logger/src/common/middleware/functional-logger.ts
import { NextFunction, Request, Response } from "express";

export function functionalLogger(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now()
    console.log(`Functional -> ${req.method} ${req.originalUrl}`)

    const originalEnd = res.end;
    (res as any).end = (...args: any[]) => {
        const duration = Date.now() - startTime
        console.log(`Functional <- ${req.method} ${req.originalUrl} (${duration}ms)`)
        return originalEnd.apply(this, args)
    }
    next()
}
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { functionalLogger } from 'src/common/middleware/functional-logger';

@Module({
  controllers: [CatsController]
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Class-based - apply to ALL cat routes
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(CatsController)

    // Function - only to POST /cats
    consumer
      .apply(functionalLogger)
      .forRoutes({ path: 'cats', method: RequestMethod.POST })
    // TO exclude, replace forRoutes with
    // .exclude({ path: 'cats', method: RequestMethod.GET })
  }
}

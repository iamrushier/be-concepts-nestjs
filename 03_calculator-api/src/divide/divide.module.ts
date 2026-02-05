import { Module } from '@nestjs/common';
import { DivideController } from './divide.controller';
import { DivideService } from './divide.service';

@Module({
  controllers: [DivideController],
  providers: [DivideService]
})
export class DivideModule {}

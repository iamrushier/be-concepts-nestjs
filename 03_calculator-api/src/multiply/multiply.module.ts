import { Module } from '@nestjs/common';
import { MultiplyController } from './multiply.controller';
import { MultiplyService } from './multiply.service';

@Module({
  controllers: [MultiplyController],
  providers: [MultiplyService]
})
export class MultiplyModule {}

import { Module } from '@nestjs/common';
import { SubtractController } from './subtract.controller';
import { SubtractService } from './subtract.service';

@Module({
  controllers: [SubtractController],
  providers: [SubtractService],
  exports: [SubtractService]
})
export class SubtractModule { }

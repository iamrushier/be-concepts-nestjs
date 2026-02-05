import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AddModule } from './add/add.module';
import { DivideModule } from './divide/divide.module';
import { SubtractModule } from './subtract/subtract.module';
import { MultiplyModule } from './multiply/multiply.module';

@Module({
  imports: [AddModule, DivideModule, SubtractModule, MultiplyModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'tasks_clean_dev',
      entities: [Task],
      synchronize: true,
      logging: ['query', 'schema', 'error']
    }),
    TasksModule
  ],
})

export class AppModule { }

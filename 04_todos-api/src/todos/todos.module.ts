import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { InMemoryTodoRepository } from './infrastructure/in-memory-todo.repository';
import { TodoRepository } from './domain/todo.repository';

@Module({
  providers: [
    TodosService,
    { provide: TodoRepository, useClass: InMemoryTodoRepository }
  ],
  controllers: [TodosController]
})
export class TodosModule { }

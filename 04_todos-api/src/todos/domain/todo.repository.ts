// src/todos/domain/todo.repository.ts
import { CreateTodoDto } from "../dto/create-todo.dto";
import { UpdateTodoDto } from "../dto/update-todo.dto";
import { Todo } from "./todo.model"

export abstract class TodoRepository {
    abstract findAll(): Promise<Todo[]>;
    abstract findById(id: number): Promise<Todo | null>;
    abstract create(data: CreateTodoDto): Promise<Todo>;
    abstract update(id: number, data: UpdateTodoDto): Promise<Todo | null>
    abstract delete(id: number): Promise<boolean>
}

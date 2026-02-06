// src/todos/domain/todo.repository.ts
import { Todo } from "./todo.model"

export interface TodoRepository {
    findAll(): Promise<Todo[]>;
    findById(id: number): Promise<Todo>;
    create(data: Omit<Todo, 'id'>): Promise<Todo>;
    update(id: number, data: Partial<Todo>): Promise<Todo>
    delete(id: number): Promise<void>
}

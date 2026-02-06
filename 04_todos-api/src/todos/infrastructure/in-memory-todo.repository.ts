// 04_todos-api/src/todos/infrastructure/in-memory-todo.repository.ts
import { TodoRepository } from "../domain/todo.repository"
import { Todo } from "../domain/todo.model"
import { CreateTodoDto } from "../dto/create-todo.dto";
import { UpdateTodoDto } from "../dto/update-todo.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class InMemoryTodoRepository extends TodoRepository {
    private todos: Todo[] = []
    private id = 1

    async findAll(): Promise<Todo[]> {
        return this.todos;
    }

    async findById(id: number): Promise<Todo | null> {
        return this.todos.find(t => t.id === id) ?? null
    }

    async create(data: CreateTodoDto): Promise<Todo> {
        const newTodo: Todo = { id: this.id++, ...data, completed: false }
        this.todos.push(newTodo)
        return newTodo
    }

    async update(id: number, data: UpdateTodoDto): Promise<Todo | null> {
        const todo = this.todos.find(t => t.id === id)
        if (!todo) return null
        Object.assign(todo, data)
        return todo
    }

    async delete(id: number): Promise<boolean> {
        const todo = this.todos.findIndex(t => t.id === id)
        if (!todo) return false
        this.todos = this.todos.filter(t => t.id !== id)
        return true
    }
}
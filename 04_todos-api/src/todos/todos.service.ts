import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoRepository } from './domain/todo.repository';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
    constructor(private readonly repo: TodoRepository) { }

    getAllTodos() {
        return this.repo.findAll()
    }

    getTodoById(id: number) {
        const todo = this.repo.findById(id)
        if (!todo) throw new NotFoundException(`Todo ${id} not found`)
        return todo
    }

    createTodo(data: CreateTodoDto) {
        return this.repo.create(data)
    }

    updateTodo(id: number, data: UpdateTodoDto) {
        const todo = this.repo.update(id, data)
        if (!todo) throw new NotFoundException(`Todo ${id} not found`)
        return todo
    }

    updateTodoStatus(id: number, completed: boolean) {
        const todo = this.repo.update(id, { completed })
        if (!todo) throw new NotFoundException(`Todo ${id} not found`)
        return todo
    }

    deleteTodo(id: number) {
        const success = this.repo.delete(id)
        if (!success) throw new NotFoundException(`Todo ${id} not found`)
        return success
    }
}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) { }

    @Get()
    getAllTodos() {
        return this.todosService.getAllTodos()
    }

    @Get(":id")
    getTodoById(@Param("id", ParseIntPipe) id: number) {
        return this.todosService.getTodoById(id);
    }

    @Post()
    createTodo(@Body() todoData: CreateTodoDto) {
        if (!todoData || !todoData.title) return { error: "Title required" }
        return this.todosService.createTodo(todoData)
    }

    @Patch(":id")
    updateTodoStatus(@Param("id", ParseIntPipe) id: number, @Body() statusData: UpdateTodoDto) {
        if (!statusData || statusData.completed === undefined) {
            return { error: "status required" }
        }
        return this.todosService.updateTodoStatus(id, statusData.completed)
    }

    @Delete(":id")
    deleteTodo(@Param("id", ParseIntPipe) id: number) {
        const success = this.todosService.deleteTodo(id)
        return { success }
    }
}

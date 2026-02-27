import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    async create(@Body("title") title: string) {
        return await this.tasksService.create(title)
    }

    @Get()
    async findAll() {
        return await this.tasksService.findAll()
    }

    @Get("pending")
    async getPending() {
        return await this.tasksService.findPending()
    }

    @Get(":id")
    async findOne(@Param("id", ParseIntPipe) id: number) {
        return await this.tasksService.findOne(id)
    }


}

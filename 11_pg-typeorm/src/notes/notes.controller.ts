import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) { }

    @Post()
    async create(@Body("title") title: string, @Body("content") content: string) {
        return this.notesService.create(title, content)
    }

    @Get()
    async findAll() {
        return this.notesService.findAll()
    }

    @Get(":id")
    async findOne(@Param("id", ParseIntPipe) id: number) {
        return this.notesService.findOne(id)
    }
}

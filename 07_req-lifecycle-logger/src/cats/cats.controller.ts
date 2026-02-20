import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
    @Get()
    findAll() {
        return { message: "Returns all cats" }
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number) {
        return { message: `Cat with id ${id} returned` }
    }

    @Post()
    create(@Body("name") name: string) {
        return { message: `Cat with name ${name} created` }
    }
}

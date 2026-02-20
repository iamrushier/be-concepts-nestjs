import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Get(":id")
    findOne(
        @Param("id", ParseIntPipe) id: number
    ) {
        return this.booksService.findOne(id)
    }

    @Post()
    create(
        @Body("title") title: string,
        @Body("author") author: string
    ) {
        return this.booksService.create(title, author)
    }
}

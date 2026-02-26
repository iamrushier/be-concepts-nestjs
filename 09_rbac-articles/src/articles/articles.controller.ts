import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) { }

    @Get()
    findAll() {
        return this.articlesService.findAll()
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number) {
        return this.articlesService.findOne(id)
    }

    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles("editor", "admin")
    @Post()
    create(
        @Body("title") title: string,
        @Body("content") content: string,
        @Request() req
    ) {
        return this.articlesService.create(title, content, req.user.id)
    }

    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles("editor", "admin")
    @Patch(':id')
    update(
        @Param("id", ParseIntPipe) id: number,
        @Request() req,
        @Body("title") title?: string,
        @Body("content") content?: string
    ) {
        return this.articlesService.update(id, req.user.id, title, content)
    }

    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles("admin")
    @Delete(":id")
    delete(@Param("id", ParseIntPipe) id: number) {
        return this.articlesService.remove(id)
    }
}

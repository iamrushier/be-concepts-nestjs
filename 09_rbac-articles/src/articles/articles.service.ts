import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

export interface Article {
    id: number,
    title: string,
    content: string,
    authorId: number
}
@Injectable()
export class ArticlesService {
    private readonly articles: Article[] = []
    private idCounter = 1;

    findAll() {
        return this.articles
    }

    findOne(id: number) {
        const art = this.articles.find(art => art.id === id)
        if (!art) throw new NotFoundException("not found")
        return art
    }

    create(title: string, content: string, userId: number) {
        const article: Article = { id: this.idCounter++, title, content, authorId: userId }
        this.articles.push(article)
        return article
    }
    update(id: number, userId: number, title?: string, content?: string) {
        const article = this.findOne(id)
        if (!article) throw new NotFoundException(`not found`)
        if (article.authorId !== userId) throw new ForbiddenException("not authorized")
        if (title) article.title = title
        if (content) article.content = content
        return article
    }

    remove(id: number) {
        const index = this.articles.findIndex(a => a.id === id)
        if (index === -1) throw new NotFoundException()
        this.articles.splice(index, 1)
        return { message: "deleted" }
    }
}

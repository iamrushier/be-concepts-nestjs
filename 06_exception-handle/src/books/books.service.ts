import { Injectable, NotFoundException } from '@nestjs/common';
import { DuplicateBookException } from './exceptions/duplicate-book.exception';

export interface Book {
    id: number;
    title: string;
    author: string;
}
@Injectable()
export class BooksService {
    private books: Book[] = [
        { id: 1, title: "1984", author: "GO" },
        { id: 2, title: "Clean Code", author: "RCM" }
    ]
    private idCount = 3
    findOne(id: number): Book {
        const book = this.books.find(b => b.id === id)
        if (!book) throw new NotFoundException(`Book with id ${id} not found`)
        return book
    }

    create(title: string, author: string): Book {
        const duplicate = this.books.some(b => b.title.toLowerCase() === title.toLowerCase())
        if (duplicate) throw new DuplicateBookException(title)
        const newBook: Book = {
            id: this.idCount++,
            title,
            author
        }
        this.books.push(newBook)
        return newBook
    }
}

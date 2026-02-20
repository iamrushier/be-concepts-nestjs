// 06_exception-handle/src/books/exceptions/duplicate-book.exception.ts
import { BadRequestException } from "@nestjs/common";

export class DuplicateBookException extends BadRequestException {
    constructor(title: string) {
        super(`A book with title ${title} already exists`)
        this.name = 'DuplicateBookException'
    }
}
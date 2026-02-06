import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {
    private todos = [];
    constructor() {
        this.todos = []
    }
    getAllTodos() {

    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './repositories/task.repository';;

@Injectable()
export class TasksService {
    constructor(private readonly taskRepository: TasksRepository) { }

    async create(title: string) {
        const task = this.taskRepository.create({ title, completed: false })
        return this.taskRepository.save(task)
    }

    async findAll() {
        return this.taskRepository.find({ order: { createdAt: "DESC" } })
    }

    async findOne(id: number) {
        const task = this.taskRepository.findOneBy({ id })
        if (!task) throw new NotFoundException(`Task #${id} ont found`)
        return task
    }

    async findPending() {
        return this.taskRepository.findIncomplete()
    }
}

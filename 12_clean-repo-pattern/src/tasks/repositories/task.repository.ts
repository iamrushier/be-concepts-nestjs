// 12_clean-repo-pattern/src/tasks/repositories/tasks.repository.ts

import { Repository, DataSource } from "typeorm";
import { Task } from "../entities/task.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TasksRepository extends Repository<Task> {
    constructor(private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager())
    }

    async findIncomplete(): Promise<Task[]> {
        return this.find({ where: { completed: false }, order: { createdAt: "DESC" } })
    }

    async findTitleLike(searchString: string) {
        return this.createQueryBuilder('task')
            .where('LOWER(task.title) LIKE LOWER(:search)', { search: `%${searchString}%` })
            .orderBy('task.createdAt', 'DESC')
            .getMany()
    }
}
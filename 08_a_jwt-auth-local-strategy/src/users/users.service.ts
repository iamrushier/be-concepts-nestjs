import { Injectable } from '@nestjs/common';

export interface User {
    userId: number;
    username: string;
    password: string
}

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            userId: 1,
            username: "jd",
            password: 'jd'
        }, {
            userId: 2,
            username: "gh",
            password: "gh"
        }
    ]

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username)
    }
}

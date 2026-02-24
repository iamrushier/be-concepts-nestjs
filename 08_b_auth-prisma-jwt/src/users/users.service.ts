import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {
        console.log("user")
    }

    async findByEmail(email: string) {
        return await this.prisma.user.findUnique({ where: { email } })
    }

    async create(email: string, password: string, name?: string) {
        if (!email) {
            throw new Error('Email is required');
        }
        const existing = await this.findByEmail(email)
        if (existing) throw new ConflictException(`User with email ${email} already exists`)
        const hashedPassword = await bcrypt.hash(password, 10)
        return await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        })
    }

    async validateUserPassword(email: string, password: string) {
        const user = await this.findByEmail(email)
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user
            return result
        }
        return null
    }
}

// 08c_login-remember-me/src/auth/refresh-token.entity.ts

import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RefreshToken {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column()
    hashedToken: string

    @Column()
    expiresAt: Date

    @Column({ default: false })
    revoked: boolean

    @ManyToOne(() => User, user => user.refreshTokens, { onDelete: 'CASCADE' })
    user: User;

    @CreateDateColumn()
    createdAt: Date
}
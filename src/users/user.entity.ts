// 08c_login-remember-me/src/users/users.entities.ts

import { RefreshToken } from "src/auth/refresh-token.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @OneToMany(() => RefreshToken, (token) => token.user)
    refreshTokens: RefreshToken[]
}
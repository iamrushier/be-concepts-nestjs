import { Module } from '@nestjs/common';
import { RefreshToken } from './refresh-token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [ // Dynamic modules - returned by methods
        TypeOrmModule.forFeature([User, RefreshToken]),
        JwtModule.register({
            secret: "random-jwt-secret"
        })
    ],
    exports: [RefreshToken]
})
export class AuthModule { }

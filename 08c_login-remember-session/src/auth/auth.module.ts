import { Module } from '@nestjs/common';
import { RefreshToken } from './refresh-token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [ // Dynamic modules - returned by methods
        TypeOrmModule.forFeature([User, RefreshToken]),  // Exports repository providers, for entities
        JwtModule.register({ // Provides JwtService
            secret: "random-jwt-secret"
        })
    ],
    exports: [RefreshToken],
    providers: [AuthService, RefreshToken],
    controllers: [AuthController]
})
export class AuthModule { }

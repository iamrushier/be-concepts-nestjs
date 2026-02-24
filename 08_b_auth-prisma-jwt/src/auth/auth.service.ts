import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async register(registerDto: RegisterDto) {
        const user = await this.userService.create(
            registerDto.email,
            registerDto.password,
            registerDto.name
        )
        return this.generateToken(user)
    }

    async login(loginDto: LoginDto) {
        const user = await this.userService.validateUserPassword(loginDto.email, loginDto.password)
        if (!user) throw new UnauthorizedException("Invalid credentials")
        return this.generateToken(user)
    }

    private generateToken(user: any) {
        const payload = { sub: user.id, email: user.email }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}

import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("register")
    async register(@Body() registerDto: RegisterDto) {
        return await this.authService.register(registerDto)
    }

    @Post("login")
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto)
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("profile")
    getProfile(@Req() req) {
        return req.user
    }
}

import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("register")
    async register(@Body() body) {
        return this.authService.register(body.email, body.password)
    }

    @Post("login")
    async login(
        @Body() body,
        @Res({ passthrough: true }) res: Response // use response object without taking full control
    ) {
        const { accessToken, refreshToken } = await this.authService.login(body.email, body.password, body.rememberMe)

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: body.rememberMe ?
                7 * 24 * 60 * 60 * 1000 :
                1 * 24 * 60 * 60 * 1000
        })
        return { accessToken } // AS passthrough allowed, no need to manually return res
    }

    @Post("refresh")
    async refresh(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response
    ) {
        const token = req.cookies.refreshToken;
        const { accessToken, refreshToken } = await this.authService.refresh(token)

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return { accessToken }
    }
}

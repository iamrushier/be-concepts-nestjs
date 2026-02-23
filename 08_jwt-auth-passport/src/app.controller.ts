import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {

  constructor(private authService: AuthService) { }
  // AuthGuard - NestJS factory function (mixin) - returns class
  // @UseGuards(AuthGuard("local"))  // No hardcoding magic string
  @UseGuards(LocalAuthGuard)
  @Post("auth/login")
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(LocalAuthGuard)
  @Post("auth/logout")
  async logout(@Request() req) {
    return req.logout()
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}

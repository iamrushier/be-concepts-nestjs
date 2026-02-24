// 08_b_auth-prisma-jwt/src/auth/jwt.strategy.ts

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET as string || "test"
        });
    }

    async validate(payload: { sub: number, email: string }): Promise<any> {
        const user = await this.usersService.findByEmail(payload.email)
        if (!user) {
            throw new UnauthorizedException();
        }

        const { password, id, ...result } = user
        return { ...result, userId: user.id }
    }
}
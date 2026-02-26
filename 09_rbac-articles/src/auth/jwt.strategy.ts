// 09_rbac-articles/src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "secret-key"
        })
    }
    async validate(payload: any): Promise<any> {
        console.log("hel", payload)
        if (!payload.sub || !payload.roles) {
            throw new UnauthorizedException();
        }
        return {
            id: payload.sub,
            roles: payload.roles,
            email: payload.email
        }
    }
}
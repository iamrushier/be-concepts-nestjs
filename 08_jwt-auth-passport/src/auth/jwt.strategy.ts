// 08_a_jwt-auth-local-strategy/src/auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { jwtConstants } from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret,
            ignoreExpiration: false
        })
    }
    async validate(payload: any): Promise<any> {
        return { userId: payload.sub, username: payload.username }
    }
}
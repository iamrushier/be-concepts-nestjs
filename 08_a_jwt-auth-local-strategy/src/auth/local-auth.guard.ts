// 08_a_jwt-auth-local-strategy/src/auth/local-auth.guard.ts

import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") { }
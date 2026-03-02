// 08c_login-remember-session/src/auth/dtos/login.dto.ts
import { IsBoolean, IsEmail, IsString, MinLength } from "class-validator"

export class LoginDto {
    @IsEmail({}, { message: "Invalid email" })
    email: string

    @IsString()
    @MinLength(8, { message: "Password must be 8 chars or more" })
    password: string

    @IsBoolean()
    rememberMe: boolean
}
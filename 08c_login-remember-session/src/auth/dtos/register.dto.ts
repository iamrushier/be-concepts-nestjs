import { IsEmail, IsString, MinLength } from "class-validator";

// 08c_login-remember-session/src/auth/dtos/register.dto.ts
export class RegisterDto {
    @IsEmail({}, { message: "Invalid email" })
    email: string;

    @IsString()
    @MinLength(8, { message: "Password must be of at least 8 characters" })
    password: string
}
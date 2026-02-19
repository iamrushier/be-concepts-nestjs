// 05_req-validation/src/users/dto/create-user.dto.ts
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString, Matches, Min, MinLength } from "class-validator"
import { Type } from "class-transformer"
export enum UserRole {
    USER = "user",
    ADMIN = "admin"
}

export class CreateUserDTO {
    @IsNotEmpty()
    @IsEmail({}, { message: "Invalid email" })
    email: string;

    @IsString()
    @MinLength(8, { message: "Password must be at least 8 characters long" })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: "Password must contain uppercase, lowercase, and number/special char"
    })
    password: string

    @IsInt()
    @Min(18, { message: "You must be at least 18 years old" })
    @Type(() => Number)
    age: number;

    @IsEnum(UserRole, { message: "Role must be one of: user, admin" })
    role: UserRole
}
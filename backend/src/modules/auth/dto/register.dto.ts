import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;

    @IsOptional()
    phone?: string;

    @IsOptional()
    inviteCode?: string;
}

import { IsEmail, IsNotEmpty, IsOptional, IsString, IsIn } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsIn(['cliente', 'propietario', 'admin'])
    @IsOptional()
    role: string;
}

import { IsEmail, IsOptional, IsString, IsIn } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    username?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    @IsIn(['cliente', 'propietario', 'admin'])
    role?: string;
}

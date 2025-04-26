export interface CreateUserDto {
    email: string;
    password: string;
    role?: 'usuario' | 'admin';
}

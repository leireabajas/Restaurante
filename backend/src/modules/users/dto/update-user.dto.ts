export interface UpdateUserDto {
    username?: string;
    email?: string;
    password?: string;
    phone?: string;
    role?: 'usuario' | 'admin';
}
export interface UpdateUserDto {
    email?: string;
    password?: string;
    role?: 'usuario' | 'admin';
}

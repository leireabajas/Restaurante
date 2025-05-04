import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UsersService} from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async validateUser(
        identifier: string,
        password: string
    ): Promise<any> {
        // 1) tratamos de buscar por email
        let user = await this.usersService.findByEmail(identifier);
        // 2) si no existe, por username
        if (!user) {
            user = await this.usersService.findByUsername(identifier);
        }
        if (!user) throw new UnauthorizedException('Credenciales inválidas');

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new UnauthorizedException('Credenciales inválidas');

        return {id: user._id, email: user.email, username: user.username, role: user.role};
    }

    async login(user: any) {
        const payload = {
            username: user.username,
            email: user.email,
            sub: user.id,
            role: user.role,
        };
        return {access_token: this.jwtService.sign(payload)};
    }

    async register(body: {
        username: string;
        email: string;
        password: string;
        phone?: string;
        role?: string;
    }) {

        const newUser = await this.usersService.create({
            username: body.username,
            email: body.email,
            password: body.password,
            phone: body.phone,
            role: (body.role as 'usuario' | 'admin') || 'usuario'
        });


        const payload = {
            sub: newUser._id!.toString(),
            email: newUser.email,
            username: newUser.username,
            role: newUser.role,
        };

        // 3️⃣ Firmamos y devolvemos el token
        return {
            access_token: this.jwtService.sign(payload)
        };
    }


    async changePassword(
        userId: string,
        currentPassword: string,
        newPassword: string
    ): Promise<{ message: string }> {
        // 1. Obtener usuario
        const user = await this.usersService.findOne(userId);

        // 2. Verificar contraseña actual
        const valid = await bcrypt.compare(currentPassword, user.password);
        if (!valid) throw new UnauthorizedException('Contraseña actual incorrecta');

        // 3. Evitar misma contraseña
        const same = await bcrypt.compare(newPassword, user.password);
        if (same) throw new ConflictException('La nueva contraseña debe ser distinta');

        // 4. Actualizar (UsersService.update hace el hash una sola vez)
        await this.usersService.update(userId, {password: newPassword});

        return {message: 'Contraseña cambiada con éxito'};
    }

}

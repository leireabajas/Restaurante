import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (!user) throw new UnauthorizedException('Credenciales inválidas');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Credenciales inválidas');

        return { id: user._id, email: user.email, role: user.role };
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id, role: user.role };
        return { access_token: this.jwtService.sign(payload) };
    }

    async register(body: { email: string; password: string; role?: string }) {
        const existing = await this.usersService.findByEmail(body.email);
        if (existing) throw new ConflictException('El usuario ya existe');



        const newUser = await this.usersService.create({
            email: body.email,
            password: body.password,
            role: (body.role || 'usuario') as 'usuario' | 'admin'
        });

        const payload = { email: newUser.email, sub: newUser._id, role: newUser.role };
        return { access_token: this.jwtService.sign(payload) };
    }

}

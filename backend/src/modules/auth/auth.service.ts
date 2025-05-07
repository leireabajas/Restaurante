import {
    Injectable,
    ConflictException,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import {ConfigService} from "@nestjs/config";


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    // Verifica email o username + contraseña
    async validateUser(identifier: string, password: string): Promise<any> {
        const user = identifier.includes('@')
            ? await this.usersService.findByEmail(identifier)
            : await this.usersService.findByUsername(identifier);

        if (!user) throw new UnauthorizedException('Credenciales inválidas');
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new UnauthorizedException('Credenciales inválidas');

        return {
            id:       user._id!.toString(),
            username: user.username,
            email:    user.email,
            role:     user.role
        };
    }

    // Genera el JWT
    async login(user: any) {
        const payload = {
            sub:      user.id,
            username: user.username,
            email:    user.email,
            role:     user.role
        };
        return { access_token: this.jwtService.sign(payload) };
    }

    async register(body: CreateUserDto & { inviteCode?: string }) {
        const { username, email, password, phone, inviteCode } = body;

        // Validación de duplicados
        if (await this.usersService.findByEmail(email)) {
            throw new ConflictException('Email ya existe');
        }
        if (await this.usersService.findByUsername(username)) {
            throw new ConflictException('Username ya existe');
        }

        // Determinar el rol basado en el código de invitación
        const expectedInviteCode = this.configService.get<string>('INVITE_CODE_PROPIETARIO');
        const role = inviteCode === expectedInviteCode ? 'propietario' : 'cliente';

        // Crear usuario con rol
        const newUser = await this.usersService.create({
            username,
            email,
            password,
            phone,
            role,
        });

        // Firmar JWT
        const payload = {
            sub: newUser._id!.toString(),
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
        };

        return { access_token: this.jwtService.sign(payload) };
    }




}

import {
    Controller,
    Post,
    Body, UseGuards, Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import {JwtAuthGuard} from "./auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { identifier: string; password: string }) {
        const user = await this.authService.validateUser(body.identifier, body.password);
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() body: CreateUserDto) {
        // Puedes ajustar si quieres que ciertos roles requieran validación
        const role = body.role || 'cliente';
        return this.authService.register({ ...body, role });
    }

}

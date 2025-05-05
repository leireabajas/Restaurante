import {Controller, Post, Body, UseGuards, Req} from '@nestjs/common';
import {AuthService} from './auth.service';
import {JwtAuthGuard} from "./auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('login')
    async login(
        @Body() body: { identifier: string; password: string }
    ) {
        const user = await this.authService.validateUser(body.identifier, body.password);
        return this.authService.login(user);
    }

    @Post('register')
    async register(
        @Body() body: {
            username: string;
            email: string;
            password: string;
            phone?: string;
            role?: string;
        }
    ) {
        // delegamos la validación de duplicados al UsersService
        return this.authService.register(body);
    }


    @UseGuards(JwtAuthGuard)
    @Post('change-password')
    async changePassword(
        @Req() req: any,
        @Body() body: {
            currentPassword: string;
            newPassword: string;
        }
    ): Promise<{ message: string }> {
        // req.user viene del JwtAuthGuard
        const userId = (req.user as any).userId;
        return this.authService.changePassword(
            userId,
            body.currentPassword,
            body.newPassword
        );
    }

}

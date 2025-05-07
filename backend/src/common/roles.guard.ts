import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(ctx: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            ctx.getHandler(),
            ctx.getClass(),
        ]);
        if (!requiredRoles) return true;  // si no hay @Roles, dejo pasar

        const req = ctx.switchToHttp().getRequest();
        const user = req.user;           // inyectado por JwtAuthGuard
        if (!user || !requiredRoles.includes(user.role)) {
            throw new ForbiddenException('No tienes permisos suficientes');
        }
        return true;
    }
}


import { SetMetadata } from '@nestjs/common';
export const ROLES_KEY = Symbol('roles');
export const Roles = (...roles: ('cliente' | 'propietario' | 'admin')[]) =>
    SetMetadata(ROLES_KEY, roles);


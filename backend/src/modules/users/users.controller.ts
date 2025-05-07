import {Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Patch} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Usuario } from '../../schemas/user.schema';
import {RolesGuard} from "../../common/roles.guard";
import {JwtAuthGuard} from "../auth/auth.guard";
import {Roles} from "../../common/roles.decorator";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users') // 👈 Define la ruta base para este controlador
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Roles('admin')
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<Usuario> {
        return this.usersService.create(createUserDto);
    }

    // ➤ Obtener todos los usuarios
    @Get()
    async findAll(): Promise<Usuario[]> {
        return this.usersService.findAll();
    }

    // ➤ Obtener un usuario por ID
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Usuario> {
        return this.usersService.findOne(id);
    }

    @Roles('admin')
    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<any> {
        return this.usersService.update(id, updateUserDto);
    }

    @Roles('admin')
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.usersService.delete(id);
    }
}

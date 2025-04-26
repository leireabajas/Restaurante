import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Usuario } from '../../schemas/user.schema';

@Controller('users') // 👈 Define la ruta base para este controlador
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // ➤ Crear un usuario
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

    // ➤ Actualizar un usuario por ID
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<Usuario> {
        return this.usersService.update(id, updateUserDto);
    }

    // ➤ Eliminar un usuario por ID
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.usersService.delete(id);
    }
}

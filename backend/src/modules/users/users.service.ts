import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario, UsuarioDocument } from '../../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Usuario.name) private userModel: Model<UsuarioDocument>) {}

    async findAll(): Promise<Usuario[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<Usuario> {
        const user = await this.userModel.findById(id).exec();
        if (!user) throw new NotFoundException('Usuario no encontrado');
        return user;
    }

    async findByEmail(email: string): Promise<UsuarioDocument | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findByUsername(username: string): Promise<UsuarioDocument | null> {
        return this.userModel.findOne({ username }).exec();
    }

    async create(createUserDto: CreateUserDto): Promise<Usuario> {
        // Verificar email
        if (await this.findByEmail(createUserDto.email)) {
            throw new ConflictException('El email ya está en uso');
        }
        // Verificar username
        if (await this.findByUsername(createUserDto.username)) {
            throw new ConflictException('El nombre de usuario ya existe');
        }

        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = new this.userModel({
            username: createUserDto.username,
            email: createUserDto.email,
            password: hashedPassword,
            phone: createUserDto.phone,
            role: createUserDto.role || 'usuario'
        });
        return newUser.save();
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<Usuario> {
        // Si cambia username, verificar duplicado
        if (updateUserDto.username) {
            const existing = await this.findByUsername(updateUserDto.username);
            if (existing && existing._id.toString() !== id) {
                throw new ConflictException('El nombre de usuario ya existe');
            }
        }
        // Si cambia email, verificar duplicado
        if (updateUserDto.email) {
            const existing = await this.findByEmail(updateUserDto.email);
            if (existing && existing._id.toString() !== id) {
                throw new ConflictException('El email ya está en uso');
            }
        }

        // Si cambia contraseña, hashearla
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }

        const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
        if (!updatedUser) throw new NotFoundException('Usuario no encontrado');
        return updatedUser;
    }

    async delete(id: string): Promise<void> {
        const result = await this.userModel.findByIdAndDelete(id).exec();
        if (!result) throw new NotFoundException('Usuario no encontrado');
    }
}

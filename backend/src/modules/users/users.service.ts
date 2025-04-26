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

    async create(createUserDto: CreateUserDto): Promise<Usuario> {
        const existingUser = await this.findByEmail(createUserDto.email);
        if (existingUser) throw new ConflictException('El usuario ya existe');

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = new this.userModel({ ...createUserDto, password: hashedPassword });
        return newUser.save();
    }



    async update(id: string, updateUserDto: UpdateUserDto): Promise<Usuario> {
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

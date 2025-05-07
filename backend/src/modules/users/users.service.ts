import {Injectable, NotFoundException, ConflictException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Usuario, UsuarioDocument} from '../../schemas/user.schema';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Usuario.name) private userModel: Model<UsuarioDocument>
    ) {
    }

    async findAll(): Promise<Usuario[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<Usuario> {
        const user = await this.userModel.findById(id).exec();
        if (!user) throw new NotFoundException('Usuario no encontrado');
        return user;
    }

    async findByEmail(email: string): Promise<UsuarioDocument | null> {
        return this.userModel.findOne({email}).exec();
    }

    async findByUsername(username: string): Promise<UsuarioDocument | null> {
        return this.userModel.findOne({username}).exec();
    }

    async create(createUserDto: CreateUserDto): Promise<Usuario> {

        const {username, email, phone, password} = createUserDto;
        // comprobar duplicados
        if (await this.findByEmail(email)) {
            throw new ConflictException('Email ya registrado');
        }
        if (await this.findByUsername(username)) {
            throw new ConflictException('Username ya registrado');
        }

        const hashed = await bcrypt.hash(password, 10);
        const validRoles = ['cliente', 'propietario', 'admin'];
        if (!validRoles.includes(createUserDto.role)) {
            throw new ConflictException('Rol no permitido');
        }
        const newUser = new this.userModel({
            username,
            email,
            password: hashed,
            phone,
            role: createUserDto.role // ← respeta el rol que llega
        });

        return newUser.save();
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<Usuario> {
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        const updated = await this.userModel
            .findByIdAndUpdate(id, updateUserDto, {new: true})
            .exec();
        if (!updated) throw new NotFoundException('Usuario no encontrado');
        return updated;
    }

    async delete(id: string): Promise<void> {
        const result = await this.userModel.findByIdAndDelete(id).exec();
        if (!result) throw new NotFoundException('Usuario no encontrado');
    }



}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Restaurante, RestauranteDocument } from '../../schemas/restaurant.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantsService {
    constructor(
        @InjectModel(Restaurante.name)
        private restaurantModel: Model<RestauranteDocument>,
    ) {}

    async findAll(): Promise<Restaurante[]> {
        return this.restaurantModel.find().exec();
    }

    async findOne(id: string): Promise<Restaurante> {
        const restaurant = await this.restaurantModel.findById(id).exec();
        if (!restaurant) throw new NotFoundException('Restaurante no encontrado');
        return restaurant;
    }

    async create(createRestaurantDto: CreateRestaurantDto, propietarioId: string): Promise<Restaurante> {
        const newRestaurant = new this.restaurantModel({
            ...createRestaurantDto,
            propietario: new Types.ObjectId(propietarioId)
        });
        return newRestaurant.save();
    }

    async update(id: string, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurante> {
        const updatedRestaurant = await this.restaurantModel.findByIdAndUpdate(id, updateRestaurantDto, { new: true }).exec();
        if (!updatedRestaurant) throw new NotFoundException('Restaurante no encontrado');
        return updatedRestaurant;
    }

    async delete(id: string): Promise<void> {
        const deleted = await this.restaurantModel.findByIdAndDelete(id).exec();
        if (!deleted) throw new NotFoundException('Restaurante no encontrado');
    }

    async findByPropietario(propietarioId: string): Promise<Restaurante[]> {
        return this.restaurantModel.find({ propietario: propietarioId }).exec();
    }

}

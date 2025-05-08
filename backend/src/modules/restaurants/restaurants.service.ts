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

    async findAll(filter: { propietario?: string } = {}): Promise<Restaurante[]> {
        return this.restaurantModel.find(filter).exec();
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
        const existing = await this.restaurantModel.findById(id).exec();
        if (!existing) throw new NotFoundException('Restaurante no encontrado');

        Object.assign(existing, updateRestaurantDto, {
            propietario: existing.propietario  // ⚠️ mantener propietario
        });

        return existing.save();
    }

    async delete(id: string): Promise<void> {
        const deleted = await this.restaurantModel.findByIdAndDelete(id).exec();
        if (!deleted) throw new NotFoundException('Restaurante no encontrado');
    }

    async findByPropietario(propietarioId: string): Promise<Restaurante[]> {
        return this.restaurantModel.find({ propietario: new Types.ObjectId(propietarioId) }).exec();
    }

}

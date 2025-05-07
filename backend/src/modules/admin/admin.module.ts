import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from '../../schemas/user.schema';
import { Restaurante, RestauranteSchema } from '../../schemas/restaurant.schema';
import { Reserva, ReservaSchema } from '../../schemas/reservation.schema';
import {RestaurantsModule} from "../restaurants/restaurants.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Usuario.name, schema: UsuarioSchema },
            { name: Restaurante.name, schema: RestauranteSchema },
            { name: Reserva.name, schema: ReservaSchema }
        ]),
        RestaurantsModule
    ],
    controllers: [AdminController],
    providers: [AdminService]
})
export class AdminModule {}

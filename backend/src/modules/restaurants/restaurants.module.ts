import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Restaurante, RestauranteSchema} from '../../schemas/restaurant.schema';
import {RestaurantsService} from './restaurants.service';
import {RestaurantsController} from './restaurants.controller';
import {AdminRestaurantsController} from "./admin-restaurants.controller";

@Module({
    imports: [MongooseModule.forFeature([{
        name: Restaurante.name,
        schema: RestauranteSchema,
        collection: 'misRestaurantes'
    }])],
    controllers: [RestaurantsController, AdminRestaurantsController],
    providers: [RestaurantsService],
    exports: [RestaurantsService],
})
export class RestaurantsModule {
}
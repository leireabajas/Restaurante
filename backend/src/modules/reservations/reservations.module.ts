import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reserva, ReservaSchema } from '../../schemas/reservation.schema';
import { Restaurante, RestauranteSchema } from '../../schemas/restaurant.schema';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reserva.name, schema: ReservaSchema },
      { name: Restaurante.name, schema: RestauranteSchema }
    ])
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService],
})
export class ReservationsModule {}

import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Usuario} from '../../schemas/user.schema';
import {Restaurante} from '../../schemas/restaurant.schema';
import {Reserva} from '../../schemas/reservation.schema';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Usuario.name) private userModel: Model<any>,
        @InjectModel(Restaurante.name) private restaurantModel: Model<any>,
        @InjectModel(Reserva.name) private reservationModel: Model<any>,
    ) {
    }

    async getEstadisticas() {
        const totalUsuarios = await this.userModel.countDocuments();
        const totalRestaurantes = await this.restaurantModel.countDocuments();
        const totalReservas = await this.reservationModel.countDocuments();

        const reservasPorDia = await this.reservationModel.aggregate([
            {
                $group: {
                    _id: "$fecha",
                    total: {$sum: 1}
                }
            },
            {
                $group: {
                    _id: null,
                    promedio: {$avg: "$total"}
                }
            }
        ]);

        const topRestaurantes = await this.reservationModel.aggregate([
            {
                $group: {
                    _id: "$restaurante",
                    totalReservas: {$sum: 1}
                }
            },
            {$sort: {totalReservas: -1}},
            {$limit: 5},
            {
                $lookup: {
                    from: "misRestaurantes",
                    localField: "_id",
                    foreignField: "_id",
                    as: "restaurante"
                }
            },
            {
                $unwind: "$restaurante"
            },
            {
                $project: {
                    nombre: "$restaurante.nombre",
                    totalReservas: 1
                }
            }
        ]);

        return {
            totalUsuarios,
            totalRestaurantes,
            totalReservas,
            promedioReservasPorDia: reservasPorDia[0]?.promedio || 0,
            topRestaurantes
        };
    }


}

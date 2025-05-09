import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import {RestaurantsModule} from './modules/restaurants/restaurants.module';
import {ReservationsModule} from './modules/reservations/reservations.module';
import {UsersModule} from './modules/users/users.module';
import {AuthModule} from './modules/auth/auth.module';
import * as process from "node:process";
import 'dotenv/config'
import {AdminModule} from "./modules/admin/admin.module";

@Module({
    imports:[ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.DBURL as string),
        RestaurantsModule,
        ReservationsModule,
        UsersModule,
        AuthModule,
        AdminModule,


    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}

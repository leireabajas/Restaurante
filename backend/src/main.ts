import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  console.log(`Conectado a: ${configService.get<string>('DBURL')}`);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const PORT = config.get('port');


  await app.listen(PORT ?? 3000);


  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(json({ limit: '5mb' }));
  app.use(urlencoded({ extended: true }));
  app.use(helmet());
  app.use(compression());

  app.enableCors();

}
bootstrap();

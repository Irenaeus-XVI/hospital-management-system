import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(json({ limit: '5mb' }));
  app.use(urlencoded({ extended: true }));
  app.use(helmet());
  app.use(compression());

  app.enableCors();

}
bootstrap();

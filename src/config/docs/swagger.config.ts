import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerUi = new DocumentBuilder()
  .setTitle('AL-AMIR HOSPITAL')
  .setDescription('API Documentation for AL-AMIR HOSPITAL')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

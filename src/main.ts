import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument } from './swagger/swagger';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerModule.setup('api/v1', app, createDocument(app));
  await app.listen(process.env.port || 3000);
  console.info('SERVER IS RUNNING ON PORT', process.env.port || 3000);
}

bootstrap();

import { config } from 'dotenv';
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setupSwagger } from './utils/swagger';
import { setupSecurity } from './middlewares/security';

config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    //TODO: use winston to create custome logs in production mode
    logger: ['log', 'warn', 'debug'],
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  setupSecurity(app);
  setupSwagger(app);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

require('dotenv').config();
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';
import { setupSwagger } from './swagger';
import helmet from 'helmet';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'warn', 'debug'],
  });

  app.setGlobalPrefix('api');
  app.use(helmet());
  app.use(csurf());
  app.use(cookieParser());
  app.use(urlencoded({ extended: true }));
  app.enableCors();
  app.use(
    json({
      limit: '10mb',
    }),
  );
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

  setupSwagger(app);
  
  app.set('trust proxy', (ip: string) => {
    if (ip !== process.env.TRUSTED_IP) return false;
    return true;
  });
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

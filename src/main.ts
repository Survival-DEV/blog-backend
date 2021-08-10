require('dotenv').config();
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setupSwagger } from './utils/swagger';
import { setupSecurity } from './middlewares/security';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
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

  app.set('trust proxy', (ip: string) => {
    if (ip !== process.env.TRUSTED_IP) return false;
    return true;
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

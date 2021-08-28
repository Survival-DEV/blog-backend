import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import Joi from 'joi';


import connectionOptions from '../ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { UsersModule } from './modules/users/users.module';
import { TagsModule } from './modules/tags/tags.module';
import { CommentsModule } from './modules/comments/comments.module';
import { AuthModule } from './modules/auth/auth.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
      storage: new ThrottlerStorageRedisService(),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      //TODO: move this validation into a separate pipe function
      validationSchema: Joi.object({
        JWT_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        EMAIL_CONFIRMATION_URL: Joi.string().required(),
      })
    }),
    TypeOrmModule.forRoot(connectionOptions),
    AuthModule,
    UsersModule,
    BlogsModule,
    CategoriesModule,
    TagsModule,
    CommentsModule,
    NotificationsModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

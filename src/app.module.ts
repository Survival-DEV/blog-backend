import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

import connectionOptions from '../ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { UsersModule } from './modules/users/users.module';
import { TagsModule } from './modules/tags/tags.module';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development'],
    }),
    TypeOrmModule.forRoot(connectionOptions),
    UsersModule,
    BlogsModule,
    CategoriesModule,
    TagsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

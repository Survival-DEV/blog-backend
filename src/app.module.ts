import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './users/user.entity';
import { BlogEntity } from './blogs/model/blog.entity';
import { CategoriesModule } from './categories/categories.module';
import { BlogsModule } from './blogs/blogs.module';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { Tag } from "./tags/entities/tag.entity";


@Module({
  imports: [
    ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env.development'],
        }),
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      keepConnectionAlive: true,
      entities: [UserEntity, BlogEntity,Tag],
      synchronize: true,
    }),
    UsersModule,
    BlogsModule,
    CategoriesModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

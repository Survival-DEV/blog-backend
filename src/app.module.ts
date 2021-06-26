import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './database/entities/user.entity';
import { BlogEntity } from './database/entities/blog.entity';
import { CategoriesModule } from './categories/categories.module';
import { BlogsModule } from './blogs/blogs.module';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { TagEntity } from "./database/entities/tag.entity";
import { CategoryEntity } from './database/entities/category.entity';
import connectionOptions from '../ormconfig';



@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // }),
    TypeOrmModule.forRoot(connectionOptions),
    UsersModule,
    BlogsModule,
    CategoriesModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


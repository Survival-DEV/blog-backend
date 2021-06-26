import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsController } from './blogs.controller';
import { BlogService } from './blogs.service';
import { BlogEntity } from '../database/entities/blog.entity';
import { BlogCategoryEntity } from '../database/entities/blog-category.entity';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([BlogEntity, BlogCategoryEntity])],
  exports: [TypeOrmModule.forFeature([BlogEntity, BlogCategoryEntity])],
  controllers: [BlogsController],
  providers: [BlogService],
})
export class BlogsModule {}

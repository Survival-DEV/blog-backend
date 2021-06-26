import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoryEntity } from '../database/entities/category.entity';
import { CategoriesService } from './categories.service';
import { BlogCategoryEntity } from 'src/database/entities/blog-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, BlogCategoryEntity])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}

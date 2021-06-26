import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  DeleteResult,
  Entity,
  EntityRepository,
  Repository,
  UpdateResult,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CategoryEntity } from '../database/entities/category.entity';
import { CategoryInterface } from './interface/category.interface';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Injectable()
@EntityRepository(CategoryEntity)
export class CategoriesService extends Repository<CategoryEntity> {
  async findAll(): Promise<CategoryInterface[]> {
    return await this.find({});
  }

  public async findById(id: string): Promise<CategoryInterface> {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category #${id} is not found`);
    }
    return category;
  }

  public async createCategory(
    categoryEntry: CreateCategoryDto,
  ): Promise<CategoryInterface> {
    try {
      const { title } = categoryEntry;
      const category = new CategoryEntity();
      category.title = title;

      await this.save(category);
      return category;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateCategory(
    id: string,
    categoryEntry: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    const category = await this.findOne({ id });
    if (!category) {
      throw new NotFoundException(`Category #${id} is not found`);
    }
    return await this.update(id, categoryEntry);
  }

  public async removeCategory(id: string): Promise<CategoryInterface> {
    const category = await this.findOne(id);
    return await this.remove(category);
  }
}

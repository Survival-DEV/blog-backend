import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';

import { CategoryEntity } from '../database/entities/category.entity';
import { CategoryInterface } from './interface/category.interface';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAll(): Promise<CategoryInterface[]> {
    return await this.categoryRepository.find();
  }

  public async findById(id: string): Promise<CategoryInterface> {
    const category = await this.categoryRepository.findOne(id);
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

      await this.categoryRepository.save(category);
      return category;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateCategory(
    id: string,
    categoryEntry: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    const category = await this.categoryRepository.findOne({ id });
    if (!category) {
      throw new NotFoundException(`Category #${id} is not found`);
    }
    return await this.categoryRepository.update(id, categoryEntry);
  }

  public async removeCategory(id: string): Promise<CategoryInterface> {
    const category = await this.categoryRepository.findOne(id);
    return await this.categoryRepository.remove(category);
  }
}

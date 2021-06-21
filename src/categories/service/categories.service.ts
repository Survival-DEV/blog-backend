import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CategoryEntity } from '../model/category.entity';
import { CategoryInterface } from '../model/category.interface';
import { CreateCategoryDto } from '../model/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categroyRepository: Repository<CategoryEntity>,
  ) {}

  async findAll(): Promise<CategoryInterface[]> {
    return await this.categroyRepository.find();
  }

  async findOne(id: string): Promise<CategoryInterface> {
    return await this.categroyRepository.findOne({ id });
  }

  async create(categoryEntry: CreateCategoryDto): Promise<CategoryInterface> {
    return await this.categroyRepository.save(categoryEntry);
  }

  async update(
    id: string,
    categoryEntry: CreateCategoryDto,
  ): Promise<UpdateResult> {
    return await this.categroyRepository.update(id, categoryEntry);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.categroyRepository.delete(id);
  }
}

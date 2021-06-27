import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

import { CreateCategoryDto } from './dto/category.dto';
import { CategoryInterface } from './interface/category.interface';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  @ApiOkResponse({ description: 'categories found' })
  async findAll(): Promise<CategoryInterface[]> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'category founf' })
  async findOne(@Param('id') id: string): Promise<CategoryInterface> {
    return await this.categoryService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'category added' })
  @ApiBody({ type: [CreateCategoryDto] })
  async create(
    @Body() categoryEntry: CreateCategoryDto,
    @Request() req,
  ): Promise<CategoryInterface> {
    return this.categoryService.create(categoryEntry);
  }

  @Put(':id')
  @ApiCreatedResponse({ description: 'category updated' })
  @ApiBody({ type: [CreateCategoryDto] })
  async updateBlog(
    @Param('id') id: string,
    @Body() categoryEntry: CreateCategoryDto,
  ): Promise<UpdateResult> {
    return this.categoryService.update(id, categoryEntry);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<DeleteResult> {
    return this.categoryService.delete(id);
  }
}

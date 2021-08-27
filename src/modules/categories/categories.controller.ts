import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

import { CreateCategoryDto } from './dto/category.dto';
import { CategoryInterface } from './interface/category.interface';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/enum/roles.decorator';
import { Role } from '../auth/enum/role.enum';

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
    return await this.categoryService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Post()
  @Permissions(Role.Admin)
  @ApiCreatedResponse({ description: 'category added' })
  @ApiBody({ type: [CreateCategoryDto] })
  async create(
    @Body() categoryEntry: CreateCategoryDto,
    @Request() req,
  ): Promise<CategoryInterface> {
    return this.categoryService.createCategory(categoryEntry);
  }

  
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Patch(':id')
  @Permissions(Role.Admin)
  @ApiCreatedResponse({ description: 'category updated' })
  @ApiBody({ type: [CreateCategoryDto] })
  async updateBlog(
    @Param('id') id: string,
    @Body() categoryEntry: CreateCategoryDto,
  ): Promise<UpdateResult> {
    return this.categoryService.updateCategory(id, categoryEntry);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Delete(':id')
  @Permissions(Role.Admin)
  async deleteCategory(@Param('id') id: string): Promise<CategoryInterface> {
    return this.categoryService.removeCategory(id);
  }
}

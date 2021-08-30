import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

import { BlogService } from './blogs.service';
import { CreateBlogDto, UpdateBlogDto } from './dto';
import { BlogEntryInterface } from './interface/blog.interface';

@Controller('blogs')
export class BlogsController {
  constructor(private blogService: BlogService) {}

  @Get()
  @ApiOkResponse({ description: 'blogs Found' })
  async findAllBlogs(): Promise<BlogEntryInterface[]> {
    return this.blogService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'blog Found' })
  async findBlog(@Param('id') id: string): Promise<BlogEntryInterface> {
    return this.blogService.findOne(id);
  }

  @Post('/create')
  @ApiCreatedResponse({ description: 'blog Added' })
  @ApiBody({ type: [CreateBlogDto] })
  public async create(
    @Body() blogEntry: CreateBlogDto,
  ): Promise<BlogEntryInterface> {
    return this.blogService.create(blogEntry);
  }

  @Put('/edit/:id')
  @ApiCreatedResponse({ description: 'blog Updated' })
  @ApiBody({ type: [CreateBlogDto] })
  async updateBlog(
    @Param('id') id: string,
    @Body() blogEntry: UpdateBlogDto,
  ): Promise<UpdateResult> {
    return this.blogService.updateOne(id, blogEntry);
  }

  @Delete('/delete/:id')
  async deleteBlog(@Param('id') id: string): Promise<DeleteResult> {
    return this.blogService.deleteOne(id);
  }
}

import {
  Body,
  Param,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

import { BlogService } from './blogs.service';
import { CreateBlogDto, UpdateBlogDto } from './dto';
import { BlogEntryInterface } from './interface/blog.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('blogs')
export class BlogsController {
  constructor(private blogService: BlogService) {}

  @Get()
  @ApiOkResponse({ description: 'blogs Found' })
  async findAllBlogs(): Promise<BlogEntryInterface[]> {
    return this.blogService.findAllBlogs();
  }

  
  @Get(':id')
  @ApiOkResponse({ description: 'blog Found' })
  async findBlog(@Param('id') id: string): Promise<BlogEntryInterface> {
    return this.blogService.findBlogById(id);
  }


  @UseGuards(JwtAuthGuard)
  @Post('/create')
  @ApiCreatedResponse({ description: 'blog Added' })
  @ApiBody({ type: [CreateBlogDto] })
  public async create(
    @Body() blogEntry: CreateBlogDto,
  ): Promise<BlogEntryInterface> {
    return this.blogService.createBlog(blogEntry);
  }


  @UseGuards(JwtAuthGuard)
  @Patch('/edit/:id')
  @ApiCreatedResponse({ description: 'blog Updated' })
  @ApiBody({ type: [UpdateBlogDto] })
  async updateBlog(
    @Param('id') id: string,
    @Body() blogEntry: UpdateBlogDto,
  ): Promise<UpdateResult> {
    return this.blogService.updateBlog(id, blogEntry);
  }


  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async deleteBlog(@Param('id') id: string): Promise<DeleteResult> {
    return this.blogService.deleteBlog(id);
  }
}

import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { BlogService } from './blogs.service';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogEntryInterface } from './interface/blog.interface';

@Controller('blogs')
export class BlogsController {
  constructor(private blogService: BlogService) {}

  @Get('')
  @ApiOkResponse({ description: 'blogs Found' })
  async findAllBlogs(): Promise<Observable<BlogEntryInterface[]>> {
    return this.blogService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'blog Found' })
  async findBlog(
    @Param('id') id: string,
  ): Promise<Observable<BlogEntryInterface>> {
    return this.blogService.findOne(id);
  }

  @Post('/create')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiCreatedResponse({ description: 'blog Added' })
  @ApiBody({ type: [CreateBlogDto] })
  public async create(
    @Body() blogEntry: CreateBlogDto,
    @Request() req,
  ): Promise<Observable<BlogEntryInterface>> {
    return this.blogService.create(blogEntry);
  }

  @Put('/edit/:id')
  @ApiCreatedResponse({ description: 'blog Updated' })
  @ApiBody({ type: [CreateBlogDto] })
  async updateBlog(
    @Param('id') id: string,
    @Body() blogEntry: UpdateBlogDto,
  ): Promise<Observable<Observable<BlogEntryInterface>>> {
    return this.blogService.updateOne(id, blogEntry);
  }

  @Delete('/delete/id')
  async deleteBlog(@Param('id') id: string): Promise<Observable<DeleteResult>> {
    return this.blogService.deleteOne(id);
  }
}

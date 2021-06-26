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
import { Observable } from 'rxjs';
import { BlogService } from '../blogs.service';
import { CreateBlogDto, UpdateBlogDto } from '../dto/blog.dto';
import { DeleteResult } from 'typeorm';
import { BlogEntryInterface } from '../interface/blog.interface';

@Controller('blogs')
export class BlogsController {
  constructor(private blogService: BlogService) {}

  @Get('')
  async findAllBlogs(): Promise<Observable<CreateBlogDto[]>> {
    return this.blogService.findAll();
  }

  @Get('/:id')
  async findBlog(@Param('id') id: string): Promise<Observable<CreateBlogDto>> {
    return this.blogService.findOne(id);
  }

  @Post('/create')
  @UseInterceptors(ClassSerializerInterceptor)
  public async create(
    @Body() blogEntry: CreateBlogDto,
    @Request() req,
  ): Promise<Observable<CreateBlogDto>> {
    return this.blogService.create(blogEntry);
  }

  @Put('/edit/:id')
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

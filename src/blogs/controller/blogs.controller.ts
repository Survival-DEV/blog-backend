import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Request,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { BlogService } from '../service/blogs.service';
import { CreateBlogDto } from '../model/blog.dto';
import { BlogEntry } from '../model/blog.interface';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
@Controller('blogs')
export class BlogsController {
  constructor(private blogService: BlogService) {}

  @Get('')
  @ApiOkResponse({ description: 'blogs Found' })
  async findAllBlogs(): Promise<Observable<CreateBlogDto[]>> {
    return this.blogService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'blog Found' })
  async findBlog(@Param('id') id: string): Promise<Observable<CreateBlogDto>> {
    return this.blogService.findOne(id);
  }

  @Get(':blogId/:commentId')
  async findCommentsPerBlog(
    @Param('blogId') blogId: string, @Param('commentId') commentId: string,
  ): Promise<Observable<CreateBlogDto>> {
    return this.blogService.findCommentsPerBlog(commentId);
  }

  @Post()
  @ApiCreatedResponse({ description: 'blog Added' })
  @ApiBody({ type: [CreateBlogDto] })
  async create(
    @Body() blogEntry: CreateBlogDto,
    @Request() req,
  ): Promise<Observable<CreateBlogDto>> {
    return this.blogService.create(blogEntry);
  }

  @Put(':id')
  @ApiCreatedResponse({ description: 'blog Updated' })
  @ApiBody({ type: [CreateBlogDto] })
  async updateBlog(
    @Param('id') id: string,
    @Body() blogEntry: BlogEntry,
  ): Promise<Observable<Observable<BlogEntry>>> {
    return this.blogService.updateOne(id, blogEntry);
  }

  @Delete('id')
  async deleteBlog(
    @Param('id') id: string,
  ): Promise<Observable<CreateBlogDto>> {
    return this.blogService.deleteOne(id);
  }
}

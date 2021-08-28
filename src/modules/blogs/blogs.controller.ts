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
  UseGuards,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { BlogService } from './blogs.service';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogEntryInterface } from './interface/blog.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/decorators/roles.enum';

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

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post('/create')
  @Permissions(Role.User)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiCreatedResponse({ description: 'blog Added' })
  @ApiBody({ type: [CreateBlogDto] })
  public async create(
    @Body() blogEntry: CreateBlogDto,
    @Request() req,
  ): Promise<Observable<BlogEntryInterface>> {
    return this.blogService.create(blogEntry);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put('/edit/:id')
  @Permissions(Role.User)
  @ApiCreatedResponse({ description: 'blog Updated' })
  @ApiBody({ type: [CreateBlogDto] })
  async updateBlog(
    @Param('id') id: string,
    @Body() blogEntry: UpdateBlogDto,
  ): Promise<Observable<Observable<BlogEntryInterface>>> {
    return this.blogService.updateOne(id, blogEntry);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete('/delete/id')
  @Permissions(Role.User, Role.Admin)
  async deleteBlog(@Param('id') id: string): Promise<Observable<DeleteResult>> {
    return this.blogService.deleteOne(id);
  }
}

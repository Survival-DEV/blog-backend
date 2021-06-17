import { Body, Controller, Get,Post,Put,Delete,Param,Request } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BlogService } from '../service/blogs.service';
import { CreateBlogDto } from '../model/blog.dto';
import { BlogEntry } from '../model/blog.interface';

@Controller('blogs')
export class BlogsController {
  constructor(private blogService: BlogService) { }
  

  @Get('')
  async findAllBlogs(): Promise<Observable<CreateBlogDto[]>> {
    return this.blogService.findAll()
  }

  @Get(':id')
  async findBlog(@Param('id') id: string): Promise<Observable<CreateBlogDto>>{
    return this.blogService.findOne(id)
  }

  @Post()
  async create(@Body() blogEntry: CreateBlogDto, @Request() req): Promise<Observable<CreateBlogDto>>{
    return this.blogService.create(blogEntry)
  }

  @Put(':id')
  async updateBlog(@Param('id') id: string, @Body() blogEntry: BlogEntry):
    Promise<Observable<Observable<BlogEntry>>>{
    return this.blogService.updateOne(id, blogEntry)
  }

  @Delete('id')
  async deleteBlog(@Param('id') id: string): Promise<Observable<CreateBlogDto>>{
    return this.blogService.deleteOne(id)
  }  
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlogMetaService } from './blog-meta.service';
import { CreateBlogMetaDto } from './dto/create-blog-meta.dto';
import { UpdateBlogMetaDto } from './dto/update-blog-meta.dto';

@Controller('blog-meta')
export class BlogMetaController {
  constructor(private readonly blogMetaService: BlogMetaService) {}

  @Post()
  create(@Body() createBlogMetaDto: CreateBlogMetaDto) {
    return this.blogMetaService.create(createBlogMetaDto);
  }

  @Get()
  findAll() {
    return this.blogMetaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogMetaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogMetaDto: UpdateBlogMetaDto) {
    return this.blogMetaService.update(id, updateBlogMetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogMetaService.remove(id);
  }
}

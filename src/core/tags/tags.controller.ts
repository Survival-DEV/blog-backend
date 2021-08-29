import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';

import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagEntity } from '../../models/entities/tag.entity';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'tag Added' })
  @ApiBody({ type: [CreateTagDto] })
  async create(@Body() data: CreateTagDto): Promise<TagEntity> {
    return await this.tagsService.create(data);
  }


  @Get(':title')
  @ApiOkResponse({ description: 'tag Found' })
  findOne(@Param('title') title: string): Promise<TagEntity> {
    return this.tagsService.findBlogsPerTag(title);
  }

  @Patch(':id')
  @ApiCreatedResponse({ description: 'tag updated' })
  @ApiBody({ type: [UpdateTagDto] })
  update(
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<UpdateResult> {
    return this.tagsService.update(id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.tagsService.remove(id);
  }
}

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
    return await this.tagsService.createTag(data);
  }

  @Get(':title')
  @ApiOkResponse({ description: 'tag Found' })
  async findOne(@Param('title') title: string): Promise<TagEntity> {
    return await this.tagsService.findBlogsPerTag(title);
  }

  @Patch(':id')
  @ApiCreatedResponse({ description: 'tag updated' })
  @ApiBody({ type: [UpdateTagDto] })
  async update(
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<UpdateResult> {
    return await this.tagsService.updateTagById(id, updateTagDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.tagsService.removeTag(id);
  }
}

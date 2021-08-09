import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagEntity } from '../../models/entities/tag.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'tag Added' })
  @ApiBody({ type: [CreateTagDto] })
  async create(@Body() data: CreateTagDto): Promise<TagEntity> {
    return await this.tagsService.create(data);
  }

  @Get()
  @ApiOkResponse({ description: 'tags Found' })
  findAll(): Promise<TagEntity[]> {
    return this.tagsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'tag Found' })
  findOne(@Param('id') id: string): Promise<TagEntity> {
    return this.tagsService.findOne(id);
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

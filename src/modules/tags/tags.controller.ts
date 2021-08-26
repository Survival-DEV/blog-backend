import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';

import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagEntity } from '../../models/entities/tag.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/enum/roles.decorator';
import { Role } from '../auth/enum/role.enum';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Post()
  @Permissions(Role.Admin)
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

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch(':id')
  @Permissions(Role.Admin)
  @ApiCreatedResponse({ description: 'tag updated' })
  @ApiBody({ type: [UpdateTagDto] })
  update(
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<UpdateResult> {
    return this.tagsService.update(id, updateTagDto);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete(':id')
  @Permissions(Role.Admin)
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.tagsService.remove(id);
  }
}

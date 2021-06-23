import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TagsService } from "./tags.service";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { Tag } from './entities/tag.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller("tags")
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Post()
  async create(@Body() data: CreateTagDto):Promise<Tag> {
    return await this.tagsService.create(data);
  }

  @Get()
  findAll():Promise <Tag[]> {
    return this.tagsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string):Promise <Tag> {
    return this.tagsService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTagDto: UpdateTagDto):Promise <UpdateResult> {
    return this.tagsService.update(id, updateTagDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string):Promise <DeleteResult> {
    return this.tagsService.remove(id);
  }
}
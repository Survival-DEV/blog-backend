import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { TagEntity } from '../../models/entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
  ) {}

  async createTag(data: CreateTagDto): Promise<TagEntity> {
    return await this.tagRepository.save(data);
  }

  async findAllTags(): Promise<TagEntity[]> {
    return await this.tagRepository.find({
      cache: true,
      select: ['title', 'meta_title', 'slug'],
    });
  }

  async findBlogsPerTag(title: string): Promise<TagEntity> {
    return await this.tagRepository.findOne({
      where: { title },
      relations: ['blogs'],
    });
  }

  async updateTagById(id: string, data: UpdateTagDto): Promise<UpdateResult> {
    return await this.tagRepository.update(id, data);
  }

  async removeTag(id: string): Promise<DeleteResult> {
    return await this.tagRepository.delete(id);
  }
}

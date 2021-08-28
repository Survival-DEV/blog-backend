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

  create(data: CreateTagDto): Promise<TagEntity> {
    return this.tagRepository.save(data);
  }

  findAll(): Promise<TagEntity[]> {
    return this.tagRepository.find({
      cache: true,
      select: ['title', 'meta_title', 'slug'],
    });
  }

  findBlogsPerTag(title: string): Promise<TagEntity> {
    return this.tagRepository.findOne({
      where: { title },
      relations: ['blogs'],
    });
  }

  update(id: string, data: UpdateTagDto): Promise<UpdateResult> {
    return this.tagRepository.update(id, data);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.tagRepository.delete(id);
  }
}

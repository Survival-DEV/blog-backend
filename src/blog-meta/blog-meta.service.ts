import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateBlogMetaDto } from './dto/create-blog-meta.dto';
import { UpdateBlogMetaDto } from './dto/update-blog-meta.dto';
import { BlogMetaEntity } from './entities/blog-meta.entity';
import { BlogMetaInterface } from './interface/blog-meta.interface';

@Injectable()
export class BlogMetaService {
  constructor(
    @InjectRepository(BlogMetaEntity)
    private readonly blogMetaRepository: Repository<BlogMetaEntity>,
  ) {}

  create(createBlogMetaDto: CreateBlogMetaDto): Promise<BlogMetaInterface> {
    return this.blogMetaRepository.save(createBlogMetaDto);
  }

   findAll(): Promise<BlogMetaInterface[]> {
    return this.blogMetaRepository.find();
  }

  findOne(id: string):
   Promise<BlogMetaInterface> {
    return this.blogMetaRepository.findOne({ id });
  }

  update(id: string, updateBlogMetaDto: UpdateBlogMetaDto):Promise<UpdateResult> {
    return this.blogMetaRepository.update(id, updateBlogMetaDto)
  }

  remove(id: string): Promise<DeleteResult> {
    return this.blogMetaRepository.delete(id);
  }
}

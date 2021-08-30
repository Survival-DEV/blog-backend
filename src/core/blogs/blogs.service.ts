import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateBlogDto, UpdateBlogDto } from './dto';
import { BlogEntity } from '../../models/entities/blog.entity';
import { BlogEntryInterface } from './interface/blog.interface';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
  ) {}

  async findAll(): Promise<BlogEntryInterface[]> {
    return await this.blogRepository.find({
      cache: true,
      relations: ['author_id'],
    });
  }

  async findOne(blogId: string): Promise<BlogEntryInterface> {
    const blog = await this.blogRepository.findOne({
      where: {
        id: blogId,
      },
      relations: ['author_id', 'comments'],
    });
    if (!blog) throw new NotFoundException();
    return blog;
  }

  async create(blogEntry: CreateBlogDto): Promise<BlogEntryInterface> {
    return await this.blogRepository.save(blogEntry);
  }

  async updateOne(id: string, blogEntry: UpdateBlogDto): Promise<UpdateResult> {
    const blog = await this.blogRepository.findOne(id);
    if (!blog) throw new NotFoundException();
    return this.blogRepository.update(id, blogEntry);
  }

  async deleteOne(id: string): Promise<DeleteResult> {
    const blog = await this.blogRepository.findOne(id);
    if (!blog) throw new NotFoundException();
    return await this.blogRepository.delete(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { BlogEntity } from '@entities/blog.entity';
import { CreateBlogDto, UpdateBlogDto } from './dto';
import { BlogEntryInterface } from './interface/blog.interface';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
  ) {}

  async findAllBlogs(): Promise<BlogEntryInterface[]> {
    return await this.blogRepository.find({
      cache: true,
      relations: ['author_id'],
    });
  }

  async findBlogById(id: string): Promise<BlogEntryInterface> {
    const blog = await this.blogRepository.findOne({
      where: {
        id,
      },
      relations: ['author_id', 'comments'],
    });
    if (!blog) throw new NotFoundException();
    return blog;
  }

  async createBlog(blogEntry: CreateBlogDto): Promise<BlogEntryInterface> {
    return await this.blogRepository.save(blogEntry);
  }

  async updateBlog(
    id: string,
    blogEntry: UpdateBlogDto,
  ): Promise<UpdateResult> {
    const blog = await this.blogRepository.findOne(id);
    if (!blog) throw new NotFoundException();
    return this.blogRepository.update(id, blogEntry);
  }

  async deleteBlog(id: string): Promise<DeleteResult> {
    const blog = await this.blogRepository.findOne(id);
    if (!blog) throw new NotFoundException();
    return await this.blogRepository.delete(id);
  }
}

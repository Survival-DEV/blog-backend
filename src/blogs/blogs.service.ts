import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DeleteResult, Repository } from 'typeorm';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
import { BlogEntity } from '../database/entities/blog.entity';
import { BlogEntryInterface } from './interface/blog.interface';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
  ) {}

  async findAll(): Promise<Observable<BlogEntryInterface[]>> {
    return await from(this.blogRepository.find({ relations: ['author_id'] }));
  }

  async findOne(id: string): Promise<Observable<BlogEntryInterface>> {
    const blog = await from(
      this.blogRepository.findOne({ id }, { relations: ['author_id'] }),
    );
    if (!blog) throw new NotFoundException();
    return blog;
  }

  async create(
    blogEntry: CreateBlogDto,
  ): Promise<Observable<BlogEntryInterface>> {
    return await from(this.blogRepository.save(blogEntry));
  }

  async updateOne(
    id: string,
    blogEntry: Partial<UpdateBlogDto>,
  ): Promise<Observable<Observable<Partial<BlogEntryInterface>>>> {
    return from(this.blogRepository.update(id, blogEntry)).pipe(
      switchMap(() => this.findOne(id)),
    );
  }

  async deleteOne(id: string): Promise<Observable<DeleteResult>> {
    const blog = await this.blogRepository.findOne(id);
    if (!blog) throw new NotFoundException();
    return await from(this.blogRepository.delete(id));
  }
}

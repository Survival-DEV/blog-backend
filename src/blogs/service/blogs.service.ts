import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, pipe } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { Repository } from 'typeorm';
import { blogDtoModel } from '../model/blog.dto';
import { BlogEntity } from '../model/blog.entity';
import { BlogEntry } from '../model/blog.interface';

@Injectable()
export class BlogService {
  constructor(@InjectRepository(BlogEntity) private readonly blogRepository: Repository<BlogEntity>) {}


  async findAll(): Promise<Observable<BlogEntry[]>> {
    return await from(this.blogRepository.find())
  }
  
  async findOne(id: string): Promise<Observable<BlogEntry>> {
    return await from(this.blogRepository.findOne({ id }));
  }

  async create(blogEntry: blogDtoModel): Promise<Observable<BlogEntry>>{
    return await from(this.blogRepository.save(blogEntry))
  }

  async updateOne(id: string, blogEntry: BlogEntry): Promise<Observable<Observable<BlogEntry>>>{
    return await from(this.blogRepository.update(id, blogEntry)).pipe(
      switchMap(() => this.findOne(id))
      )
  }

  async deleteOne(id: string): Promise<Observable<any>>{
    return await from(this.blogRepository.delete(id))
  }
}

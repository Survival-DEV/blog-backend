import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  TreeRepository,
} from 'typeorm';


import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { CommentInterface } from './interface/comment.interface';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    protected readonly commentTreeRepository: TreeRepository<CommentEntity>,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
  ): Promise<CommentEntity[] | CommentEntity | string | CommentEntity> {
    if (!createCommentDto.parent_id) {
      const parent = await this.commentTreeRepository.save(createCommentDto);
      return await this.commentTreeRepository.findAncestors(parent);
    }
    const parent = await this.commentTreeRepository.findOne(
      createCommentDto.parent_id,
    );

    const child = await this.commentTreeRepository.create({
      content: createCommentDto.content,
      blog_id: createCommentDto.blog_id,
    });
    child.parent = parent;
       
    return await this.commentTreeRepository.save(child);
  }

  async findAllComments(): Promise<CommentInterface[]> {
    return await this.commentTreeRepository.findTrees();
  }

  async findCommentsPerBlog(blog_id: string): Promise<CommentEntity> {
    return await this.commentTreeRepository.findOne(
      { blog_id },
      { relations: ['replies'] },
    );
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.commentTreeRepository.update(id, updateCommentDto);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.commentTreeRepository.delete(id);
  }
}

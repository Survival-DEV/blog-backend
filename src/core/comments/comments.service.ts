import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, TreeRepository, UpdateResult } from 'typeorm';

import { CreateCommentDto, UpdateCommentDto } from './dto';
import { CommentEntity } from '../../models/entities/comment.entity';
import { CommentInterface } from './interface/comment.interface';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    protected readonly commentTreeRepository: TreeRepository<CommentEntity>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<CommentEntity> {
    if (!createCommentDto.parent_id) {
      return await this.commentTreeRepository.save(createCommentDto);
    }
    const child = await this.commentTreeRepository.create({
      content: createCommentDto.content,
      blog_id: createCommentDto.blog_id,
    });
    child.parent = await this.commentTreeRepository.findOne(
      createCommentDto.parent_id,
    );

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

  update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<UpdateResult> {
    return this.commentTreeRepository.update(id, updateCommentDto);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.commentTreeRepository.delete(id);
  }
}

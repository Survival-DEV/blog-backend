import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  TreeRepository
} from 'typeorm';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { CommentInterface } from './interface/category.interface';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentTreeRepositry: TreeRepository<CommentEntity>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<CommentEntity[]> {
    const comment = await this.commentTreeRepositry.save(createCommentDto);
    return await this.commentTreeRepositry.findAncestors(comment);
  }
  //! TODO: find all comments per blog only
  async findAllComments(): Promise<CommentInterface[]> {
    const data = await this.commentTreeRepositry.findTrees();
    return data;
  }

  async findOne(id: string): Promise<CommentEntity> {
    return await this.commentTreeRepositry.findOne({ id });
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.commentTreeRepositry.update(id, updateCommentDto);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.commentTreeRepositry.delete(id);
  }
}

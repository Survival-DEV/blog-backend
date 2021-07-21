import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, TreeRepository } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

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

  async create(createCommentDto: CreateCommentDto): Promise<CommentInterface> {
    return await this.commentTreeRepositry.save(createCommentDto);
  }

  async findAll(): Promise<CommentInterface[]> {
    return await this.commentTreeRepositry.findTrees();
  }

  findOne(id: string): Promise<CommentInterface> {
    return this.commentTreeRepositry.findOne({ id });
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.commentTreeRepositry.update(id, updateCommentDto);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.commentTreeRepositry.delete(id);
  }
}

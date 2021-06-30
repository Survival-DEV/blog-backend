import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { CommentInterface } from './interface/category.interface';


@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<CommentInterface> {
    return await this.commentRepository.save(createCommentDto);
  }

  findAll(): Promise<CommentInterface[]> {
    return this.commentRepository.find();
  }

  findOne(id: string): Promise<CommentInterface> {
    return this.commentRepository.findOne({ id });
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.commentRepository.update(id, updateCommentDto);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.commentRepository.delete(id);
  }
}

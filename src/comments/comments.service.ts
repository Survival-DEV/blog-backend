import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogService } from '../blogs/service/blogs.service';
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
    // private readonly ErrorTreeRepositry: TreeRepositoryNotSupportedError,

    private readonly blogRepository: BlogService,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<CommentEntity[]> {
    const comment = await this.commentTreeRepositry.save(createCommentDto);
    return await this.commentTreeRepositry.findAncestors(comment);
  }

  //! TODO: find all comments per blog only & fix the children tree
  async findAllComments(): Promise<CommentInterface[]> {
    const data = await this.commentTreeRepositry.findTrees();
    //TODO: const trees = await manager.getTreeRepository(Category).findTrees();

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

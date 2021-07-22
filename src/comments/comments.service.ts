import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogService } from 'src/blogs/service/blogs.service';
import { DeleteResult, TreeRepository } from 'typeorm';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { CommentInterface } from './interface/category.interface';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentTreeRepositry: TreeRepository<CommentEntity>,
    private readonly blogRepository: BlogService,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<CommentInterface> {
    return await this.commentTreeRepositry.save(createCommentDto);
  }

  //! TODO: find all comments per blog only
  async findAllComments(): Promise<CommentInterface[]> {
    return await this.commentTreeRepositry.findTrees();
  }

  findOne(id: string): Promise<CommentInterface> {
    return this.commentTreeRepositry.findOne(
      { id },
      { relations: ['blog_id'] },
    );
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.commentTreeRepositry.update(id, updateCommentDto);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.commentTreeRepositry.delete(id);
  }
}

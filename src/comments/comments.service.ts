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
      const cat = await this.commentTreeRepository.save(createCommentDto);
      return await this.commentTreeRepository.findAncestors(cat);
    }
    const parent = await this.commentTreeRepository.findOne(
      createCommentDto.parent_id,
    );
    
    const child = await this.commentTreeRepository.create({
      content: createCommentDto.content,
      blog_id: createCommentDto.blog_id,
    });
    
    // return await this.commentTreeRepository.createDescendantsQueryBuilder(
    //   'comments',
    //   'comments_closure',
    //   parent,
    //   ).getMany()
    child.parent = parent;
    
    // res.parent= createCommentDto.parent_id
    // const res = this.commentTreeRepository
    //   .update('comments_closure', CommentEntity)
    //   .set({ id_ancestor:  createCommentDto.parent_id })
    //   .where('"id_descendant" = :id', { id: createCommentDto.id })
    //   .execute();
    // const res = await this.commentTreeRepository.query(
    //   `INSERT INTO comments_closure(id_ancestor,id_descendant)
    //   VALUES ($1 , $2)`,
    //   [createCommentDto.parent_id, createCommentDto.id],
    //   );
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

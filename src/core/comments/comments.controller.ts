import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { CommentInterface } from './interface/comment.interface';

@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('/blog/comment')
  create(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentInterface> {
    return this.commentsService.createComment(createCommentDto);
  }

  @Get('/blog/comment/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  findCommentsPerBlog(@Param('id') id: string) {
    return this.commentsService.findCommentsPerBlog(id);
  }

  @Patch('/blog/comment/:id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<UpdateResult> {
    return this.commentsService.updateCommentById(id, updateCommentDto);
  }

  @Delete('/blog/comment/:id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.commentsService.removeComment(id);
  }
}

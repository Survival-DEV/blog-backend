import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentInterface } from './interface/comment.interface';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(): Promise<CommentInterface[]> {
    return this.commentsService.findAllComments();
  }

  @Post()
  create(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentInterface> {
    return this.commentsService.create(createCommentDto);
  }

  @Get('/blog/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  findCommentsPerBlog(@Param('id') id: string) {
    return this.commentsService.findCommentsPerBlog(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<UpdateResult> {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.commentsService.remove(id);
  }
}

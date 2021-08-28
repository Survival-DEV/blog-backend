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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult, UpdateResult } from 'typeorm';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentInterface } from './interface/comment.interface';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/decorators/roles.enum';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(): Promise<CommentInterface[]> {
    return this.commentsService.findAllComments();
  }

  @Get('/blog/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  findCommentsPerBlog(@Param('id') id: string) {
    return this.commentsService.findCommentsPerBlog(id);
  }


  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Post()
  @Permissions(Role.User, Role.Admin)
  create(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentInterface> {
    return this.commentsService.create(createCommentDto);
  }


  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Patch(':id')
  @Permissions(Role.User)
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<UpdateResult> {
    return this.commentsService.update(id, updateCommentDto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Delete(':id')
  @Permissions(Role.User, Role.Admin)
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.commentsService.remove(id);
  }
}

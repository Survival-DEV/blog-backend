import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentEntity } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsModule } from 'src/blogs/blogs.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [BlogsModule, TypeOrmModule.forFeature([CommentEntity])],
})
export class CommentsModule {}

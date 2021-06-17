import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsController } from './controller/blogs.controller';
import { BlogService } from './service/blogs.service';
import { BlogEntity } from './model/blog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogEntity]),
  ],
  controllers: [BlogsController],
  providers: [BlogService]
})
export class BlogsModule {}

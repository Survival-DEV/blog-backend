import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlogEntity } from '@entities/blog.entity';
import { BlogsController } from './blogs.controller';
import { BlogService } from './blogs.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([BlogEntity])],
  controllers: [BlogsController],
  providers: [BlogService],
  exports: [BlogService],
})
export class BlogsModule {}

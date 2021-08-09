import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsController } from './blogs.controller';
import { BlogService } from './blogs.service';
import { BlogEntity } from '../../models/entities/blog.entity';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([BlogEntity])],
  controllers: [BlogsController],
  providers: [BlogService],
  exports: [BlogService],
})
export class BlogsModule {}

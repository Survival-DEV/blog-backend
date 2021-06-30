import { Module } from '@nestjs/common';
import { BlogMetaService } from './blog-meta.service';
import { BlogMetaController } from './blog-meta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogMetaEntity } from './entities/blog-meta.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BlogMetaEntity])],
  controllers: [BlogMetaController],
  providers: [BlogMetaService]
})
export class BlogMetaModule {}

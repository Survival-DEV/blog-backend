import { Module } from "@nestjs/common";
import { TagsService } from "./tags.service";
import { TagsController } from "./tags.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagEntity } from "../database/entities/tag.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}

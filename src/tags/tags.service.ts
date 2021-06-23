import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { Tag } from "./entities/tag.entity";

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>
  ) {}

  create(data: CreateTagDto):Promise<Tag> {
    return this.tagRepository.save(data);
  }

  findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  findOne(id: string): Promise<Tag> {
    return this.tagRepository.findOne(id);
  }

  update(id: string, data: UpdateTagDto): Promise<UpdateResult> {
    return this.tagRepository.update(id, data);
  }

  remove(id: string):Promise<DeleteResult> {
    return this.tagRepository.delete(id);
  }
}

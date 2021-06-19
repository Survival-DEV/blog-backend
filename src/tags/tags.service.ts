import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { Tag } from "./entities/tag.entity";

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>
  ) {}

  create(data: any): Promise<Tag> {
    return this.tagRepository.save(data);
  }

  findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  findOne(id: number): Promise<Tag> {
    return this.tagRepository.findOne(id);
  }

  update(id: number, data: any) {
    return this.tagRepository.update(id, data);
  }

  remove(id: number) {
    return this.tagRepository.delete(id);
  }
}

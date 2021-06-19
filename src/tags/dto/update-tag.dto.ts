// import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from "./create-tag.dto";

export class UpdateTagDto {
  id: string;
  title?: string;
  meta_title?: string;
  slug?: string;
}

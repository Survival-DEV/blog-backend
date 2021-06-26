import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTagDto } from "./create-tag.dto";

export class UpdateTagDto {
  id: string;
  
  @ApiProperty({type:String , description: 'title'})
  title?: string;

  @ApiProperty({type:String , description: 'meta title'})
  meta_title?: string;
  
  @ApiProperty({type:String , description: 'slug'})
  slug?: string;
}

import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({type:String , description: 'category id'})
  readonly id: string;

  @ApiProperty({type:String , description: 'category title'})
  readonly title: string;

  @ApiProperty({type:String , description: 'meta title'})
  readonly meta_title: string;

  @ApiProperty({type:String , description: 'slug'})
  readonly slug: string;

  @ApiProperty({type:String , description: 'parent id'})
  readonly parent_id: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

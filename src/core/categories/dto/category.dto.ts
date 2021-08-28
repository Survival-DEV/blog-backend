import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ type: String, description: 'category id' })
  readonly id: string;

  @ApiProperty({ type: String, description: 'category title' })
  @IsString()
  readonly title: string;

  @ApiProperty({ type: String, description: 'meta title' })
  @IsOptional()
  readonly meta_title?: string;

  @ApiProperty({ type: String, description: 'slug' })
  @IsString()
  readonly slug: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

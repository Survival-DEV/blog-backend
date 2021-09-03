import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ type: String, description: 'category id' })
  id: string;

  @ApiProperty({ type: String, description: 'category title' })
  @IsString()
  title: string;

  @ApiProperty({ type: String, description: 'meta title' })
  @IsOptional()
  meta_title?: string;

  @ApiProperty({ type: String, description: 'slug' })
  @IsString()
  slug: string;
}

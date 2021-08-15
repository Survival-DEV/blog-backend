import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, isString, IsString } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ type: String, description: 'tag id' })
  id: string;

  @ApiProperty({ type: String, description: 'title' })
  @IsString()
  title: string;

  @ApiProperty({ type: String, description: 'meta title' })
  @IsOptional()
  meta_title?: string;

  @ApiProperty({ type: String, description: 'slug' })
  @IsString()
  slug: string;
}

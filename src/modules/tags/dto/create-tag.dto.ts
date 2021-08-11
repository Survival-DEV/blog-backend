import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({ type: String, description: 'tag id' })
  id: string;

  @ApiProperty({ type: String, description: 'title' })
  title: string;

  @ApiProperty({ type: String, description: 'meta title' })
  meta_title?: string;

  @ApiProperty({ type: String, description: 'slug' })
  slug: string;
}

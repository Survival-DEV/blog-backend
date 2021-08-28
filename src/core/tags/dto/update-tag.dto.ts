import { ApiProperty } from '@nestjs/swagger';

export class UpdateTagDto {
  id: string;

  @ApiProperty({ type: String, description: 'title' })
  title?: string;

  @ApiProperty({ type: String, description: 'meta title' })
  meta_title?: string;

  @ApiProperty({ type: String, description: 'slug' })
  slug?: string;
}

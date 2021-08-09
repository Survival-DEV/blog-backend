import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty({ type: String, description: 'blog id' })
  id?: string;

  @ApiProperty({ type: String, description: 'blog title' })
  title?: string;

  @ApiProperty({ type: String, description: 'blog meta title' })
  meta_Title?: string;

  @ApiProperty({ type: String, description: 'slug' })
  slug?: string;

  @ApiProperty({ type: String, description: 'blog summary' })
  summary?: string;

  @ApiProperty({ type: Date, description: 'created at' })
  created_At?: Date;

  @ApiProperty({ type: String, description: 'content' })
  readonly content?: string;

  @ApiProperty({ type: Boolean, description: 'is draft' })
  readonly is_Draft?: boolean;

  @ApiProperty({ type: Number, description: 'next blog id' })
  readonly next_Blog_Id?: number;

  @ApiProperty({ type: Number, description: 'user id' })
  readonly user_Id?: number;

  public constructor(opts?: Partial<CreateBlogDto>) {
    Object.assign(this, opts);
  }
}

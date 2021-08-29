import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({ type: String, description: 'blog id' })
  id: string;

  @ApiProperty({ type: String, description: 'blog title' })
  @IsString()
  title: string;

  @ApiProperty({ type: String, description: 'blog meta title' })
  @IsOptional()
  meta_Title?: string;

  @ApiProperty({ type: String, description: 'slug' })
  @IsString()
  slug: string;

  @ApiProperty({ type: String, description: 'blog summary' })
  @IsString()
  summary: string;

  @ApiProperty({ type: Date, description: 'created at' })
  @IsOptional()
  created_At?: Date;

  @ApiProperty({ type: String, description: 'content' })
  @IsString()
  readonly content: string;

  @ApiProperty({ type: Boolean, description: 'is draft' })
  @IsOptional()
  readonly is_Draft?: boolean;

  @ApiProperty({ type: Number, description: 'next blog id' })
  @IsOptional()
  readonly next_Blog_Id?: number;

  @ApiProperty({ type: String, description: 'user id' })
  @IsString()
  readonly author_id: string;

  @ApiProperty({ type: String, description: 'category id' })
  @IsString()
  readonly category_id: string;

  public constructor(opts?: Partial<CreateBlogDto>) {
    Object.assign(this, opts);
  }
}

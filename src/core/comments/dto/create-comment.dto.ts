import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @Transform(id => toString(), { toClassOnly: true })
  readonly id: string;
  readonly created_at?: Date;
  readonly upadted_at?: Date;

  @IsString()
  readonly content: string;

  @IsString()
  readonly blog_id: string;

  @IsOptional()
  readonly parent_id?: string;
}

import { Transform } from 'class-transformer';

export class CreateCommentDto {
  @Transform(id => toString(), { toClassOnly: true }) 
  readonly id: string;
  readonly created_at: Date;
  readonly upadted_at: Date;
  readonly content: string;
  readonly blog_id: string;
  readonly parent_id: string;
}

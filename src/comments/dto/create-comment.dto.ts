import { Transform } from 'class-transformer';
import { BlogEntity } from 'src/blogs/model/blog.entity';

export class CreateCommentDto {
  @Transform(id => toString(), { toClassOnly: true }) 
  readonly id: string;
  readonly title: string;
  readonly is_published: boolean;
  readonly created_at: Date;
  readonly content: string;
  readonly blog_id: BlogEntity;
}

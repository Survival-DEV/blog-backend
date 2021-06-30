import { BlogEntity } from 'src/blogs/model/blog.entity';

export class CreateCommentDto {
  readonly id: string;
  readonly title: string;
  readonly is_published: boolean;
  readonly created_at: Date;
  readonly content: string;
  readonly blog_id: BlogEntity;
}

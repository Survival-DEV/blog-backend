import { BlogEntity } from '../../blogs/model/blog.entity';

export class CommentInterface {
  id: string;
  created_at: Date;
  content: string;
  blog_id: BlogEntity;
}

import { BlogEntity } from '../../blogs/model/blog.entity';

export class CommentInterface {
  id: string;
  title: string;
  is_published: boolean;
  created_at: Date;
  content: string;
  blog_id: BlogEntity;
}

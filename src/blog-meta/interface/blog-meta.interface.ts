import { BlogEntity } from "src/blogs/model/blog.entity";

export interface BlogMetaInterface {
  id?: string;
  key: string;
  content: string;
  blog_id: BlogEntity;
}

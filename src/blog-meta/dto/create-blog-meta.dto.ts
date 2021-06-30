import { BlogEntity } from "src/blogs/model/blog.entity";

export class CreateBlogMetaDto {
  readonly id: string;
  readonly key: string;
  readonly content: string;
  readonly blog_id: BlogEntity;
}

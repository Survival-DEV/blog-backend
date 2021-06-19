export interface BlogEntry {
  id?: string;
  title?: string;
  slug?: string;
  description?: string;
  body?: string;
  createdAt?: Date;
  updatedAt?: Date;
  claps?: number;
  headerImage?: string;
  publishedAt?: Date;
  isPublished?: boolean;
}

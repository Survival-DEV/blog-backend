export interface BlogEntryInterface {
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

export interface BlogMetaInterface {
  title?: string;
  meta_title?: string;
  summary?: string;
}

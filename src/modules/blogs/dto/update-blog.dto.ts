export class CreateBlogDto {
  readonly id?: string;
  readonly title?: string;
  readonly meta_Title?: string;
  readonly slug?: string;
  readonly summary?: string;
  readonly created_At?: Date;
  readonly published_At?: Date;
  readonly content?: string;
  readonly is_Draft?: boolean;
  readonly next_Blog_Id?: number;
  readonly user_Id?: number;

  public constructor(opts?: Partial<CreateBlogDto>) {
    Object.assign(this, opts);
  }
}

export class UpdateBlogDto {
  id: string;
  title: string;
  meta_Title: string;
  summary: string;
  content: string;
  updated_At: Date;
  is_Draft: boolean;
  next_Blog_Id: number;
  user_Id: number;
}

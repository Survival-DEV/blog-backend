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

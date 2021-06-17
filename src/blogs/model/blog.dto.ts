export class CreateBlogDto {
  readonly id?: string
  readonly title?: string
  readonly meta_Title?: string
  readonly slug?: string
  readonly summary?: string
  readonly created_At?: Date     
  readonly updated_At?: Date     
  readonly published_At?: Date
  readonly content?: string     
  readonly is_Draft?: boolean     
  readonly next_Blog_Id?: number     
  readonly user_Id?: number 
}
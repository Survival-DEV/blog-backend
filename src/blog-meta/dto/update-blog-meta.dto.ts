import { PartialType } from '@nestjs/swagger';
import { CreateBlogMetaDto } from './create-blog-meta.dto';

export class UpdateBlogMetaDto extends PartialType(CreateBlogMetaDto) {}

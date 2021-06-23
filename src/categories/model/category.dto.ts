import { PartialType } from '@nestjs/mapped-types';

export class CreateCategoryDto {
  readonly id: string;
  readonly title: string;
  readonly meta_title: string;
  readonly slug: string;
  readonly parent_id: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

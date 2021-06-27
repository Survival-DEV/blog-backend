import { BlogCategoryEntity } from '../../database/entities/blog-category.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  title: string;

  @Column()
  meta_title: string;

  @Column()
  slug: string;

  @Column({ nullable: true })
  parent_id: string;

  @OneToMany(
    _type => BlogCategoryEntity,
    blog_category_entity => blog_category_entity.category,
  )
  public blog_category_entity: BlogCategoryEntity[];
}

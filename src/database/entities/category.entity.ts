// import { BlogCategoryEntity } from '../../database/entities/blog-category.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BlogEntity } from './blog.entity';

@Entity('categories')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 50 })
  title: string;

  @Column()
  meta_title: string;

  @Column()
  slug: string;

  @Column({ nullable: true })
  parent_id: string;

  @ManyToMany(() => BlogEntity, blog => blog.categories, {
    onDelete: 'CASCADE',
  })
  blogs!: BlogEntity[];
}

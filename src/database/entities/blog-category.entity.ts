import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { BlogEntity } from './blog.entity';

@Entity()
export class BlogCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => BlogEntity, blog => blog.blog_category_entity)
  public blog: BlogEntity;

  @ManyToOne(() => CategoryEntity, category => category.blog_category_entity)
  public category: CategoryEntity;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { BlogEntity } from './blog.entity';

@Entity('blog_category')
export class BlogCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ManyToOne(() => BlogEntity, blog => blog.blog_category, { primary: true })
  @JoinColumn({ name: 'blog_id' })
  public blog: BlogEntity;

  @ManyToOne(() => CategoryEntity, category => category.BlogCategory, {
    primary: true,
  })
  @JoinColumn({ name: 'category_id' })
  public category: CategoryEntity;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}

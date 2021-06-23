import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from '../../categories/model/category.entity';
import { BlogEntity } from './blog.entity';

@Entity()
export class BlogCategoryEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => BlogEntity, blog => blog.blogCategoryEntity)
  public blog: BlogEntity;

  @ManyToOne(() => CategoryEntity, category => category.blogCategoryEntity)
  public category: CategoryEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

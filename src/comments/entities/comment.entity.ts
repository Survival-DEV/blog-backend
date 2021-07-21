import { BlogEntity } from '../../blogs/model/blog.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from 'typeorm';

@Entity('comments')
@Tree('closure-table')
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'varchar' })
  content: string;

  @ManyToOne(() => BlogEntity, blog => blog.id)
  @JoinColumn({ name: 'blog_id' })
  blog_id: BlogEntity;

  @TreeChildren()
  children: CommentEntity[];

  @TreeParent()
  @JoinColumn({ name: 'parent_id' })
  public parent: CommentEntity;
}

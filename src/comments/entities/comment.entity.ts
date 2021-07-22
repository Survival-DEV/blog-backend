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
import { BlogEntity } from '../../blogs/model/blog.entity';

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

  @ManyToOne(() => BlogEntity, blog => blog.comments)
  @JoinColumn({ name: 'blog_id' })
  blog_id: BlogEntity;

  @TreeChildren()
  children: CommentEntity[];

  @TreeParent()
  public parent: CommentEntity;
}

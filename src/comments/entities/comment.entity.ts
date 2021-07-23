import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeLevelColumn,
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

  @TreeParent()
  public parent: CommentEntity;

  @TreeChildren({ cascade: true })
  children: CommentEntity[];

  @TreeLevelColumn()
  @Column({ nullable: true })
  level: number;
}

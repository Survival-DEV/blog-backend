import { BlogEntity } from 'src/blogs/model/blog.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  UpdateDateColumn,
} from 'typeorm';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250 })
  title: string;

  @Column()
  is_published: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'varchar' })
  content: string;

  @ManyToOne(() => BlogEntity, blog => blog.id)
  @JoinColumn({ name: 'blog_id' })
  blog_id: BlogEntity;

  @Column({ nullable: true })
  parent_id: string;
}

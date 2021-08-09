import {
  BaseEntity,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { UserEntity } from './user.entity';
import 'reflect-metadata';

import { BlogMetaInterface } from 'src/blogs/interface/blog.interface';
import { CommentEntity } from './comment.entity';

@Entity('blogs')
@Index(['title'], { fulltext: true })
export class BlogEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  meta_title: string;

  @Column()
  slug: string;

  @Column({ default: '' })
  summary: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @BeforeUpdate()
  updateTimestamp(): void {
    this.updated_at = new Date();
  }

  @Column({ default: 0 })
  claps: number;

  @Column({ nullable: true })
  header_image: string;

  @Column({ nullable: true })
  published_at: Date;

  @Column({ default: '' })
  content: string;

  @Column({ nullable: true })
  is_draft: boolean;

  @Column({ nullable: true })
  parent_id: number;

  @ManyToOne(() => UserEntity, user => user.blogs, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'author_id' })
  author_id!: UserEntity['id'];

  @OneToMany(() => CommentEntity, comment => comment.blog_id, {
    nullable: true,
  })
  @JoinColumn({ name: 'comment_id' })
  comments: CommentEntity[];

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  public blog_meta: BlogMetaInterface; //TODO: { [p: string]: any }
}


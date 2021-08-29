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
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity } from './user.entity';
import 'reflect-metadata';

import { BlogMetaInterface } from '../../core/blogs/interface/blog.interface';
import { CommentEntity } from './comment.entity';
import { CategoryEntity } from './category.entity';
import { TagEntity } from './tag.entity';

@Entity('blogs')
//TODO: should add sync: false too
@Index(['title'], { unique: true, fulltext: true })
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

  @Column({ default: true, nullable: true })
  is_draft: boolean;

  @Column({ nullable: true })
  read_time: number;

  @Column({ nullable: true })
  parent_id: number;

  @ManyToOne(() => UserEntity, user => user.blogs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'author_id' })
  author_id!: UserEntity['id'];

  @OneToMany(() => CommentEntity, comment => comment.blog_id, {
    nullable: true,
  })
  @JoinColumn({ name: 'comment_id' })
  comments: CommentEntity[];

  @ManyToOne(() => CategoryEntity, categroy => categroy.blogs, { eager: true })
  @JoinColumn({ name: 'category_id' })
  categroy: CategoryEntity;

  @ManyToMany(() => TagEntity, { eager: true })
  @JoinTable({
    name: 'blogs_tags',
    joinColumn: {
      name: 'blog',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag',
      referencedColumnName: 'id',
    },
  })
  tags: TagEntity[];

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  public blog_meta: BlogMetaInterface; //TODO: { [p: string]: any }
}

import {
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentEntity } from '../../comments/entities/comment.entity';

import { UserEntity } from '../../users/user.entity';
import { BlogMetaInterface } from './blog.interface';

@Entity('blog')
@Index(['title'], { fulltext: true })
export class BlogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  meta_title: string;

  @Column()
  slug: string;

  @Column({ default: '' })
  summary: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @BeforeUpdate()
  updateTimestamp() {
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
  next_blog_id: number;

  @ManyToOne(() => UserEntity, user => user.blogEntries, { nullable: true })
  @JoinColumn({ name: 'author_id' })
  author_id: UserEntity;

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

  // @Column({
  //   type: 'bigint',
  //   nullable: false,
  //   unsigned: true,
  //   default: 0,
  //   transformer: {
  //     from: (val: any) => BigInt(val || '0'),
  //     to: (val: bigint) => val?.toString(),
  //   },
  // })
  // viewed?: bigint;
}

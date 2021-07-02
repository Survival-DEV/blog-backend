import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from '../../users/user.entity';
import { BlogMetaInterface } from './blog.interface';

@Entity('blog')
export class BlogEntity {
  @PrimaryGeneratedColumn()
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

  @ManyToOne(() => UserEntity, user => user.blogEntries)
  author_id: UserEntity;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  public blog_meta: BlogMetaInterface;
}

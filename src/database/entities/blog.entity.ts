import {
  BaseEntity,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity } from './user.entity';
import 'reflect-metadata';

import { CategoryEntity } from './category.entity';

@Entity('blogs')
export class BlogEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title: string;

  @Column()
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
  })
  @JoinColumn({ name: 'author_id' })
  author_id!: UserEntity['id'];
}

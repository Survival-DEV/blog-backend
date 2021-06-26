import { UserEntity } from './user.entity';
import {
  BaseEntity,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BlogCategoryEntity } from './blog-category.entity';

@Entity('blog')
export class BlogEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title: string;

  @Column()
  metaTitle: string;

  @Column()
  slug: string;

  @Column({ default: '' })
  summary: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @Column({ default: 0 })
  claps: number;

  @Column({ nullable: true })
  headerImage: string;

  @Column({ nullable: true })
  publishedAt: Date;

  @Column({ default: '' })
  content: string;

  @Column({ nullable: true })
  isDraft: boolean;

  @Column({ nullable: true })
  parentId: number;

  @ManyToOne(_type => UserEntity, user => user.blogEntries)
  author_id!: UserEntity['id'] | undefined;

  @OneToMany(
    _type => BlogCategoryEntity,
    blogCategroyEntity => blogCategroyEntity.blog,
  )
  public blogCategoryEntity: BlogCategoryEntity[];
}

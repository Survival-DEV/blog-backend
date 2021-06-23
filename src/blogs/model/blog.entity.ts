import { UserEntity } from '../../users/user.entity';
import {
  BaseEntity,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
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
  author!: UserEntity | undefined;

  @Column({ nullable: false })
  author_id!: UserEntity['id'];

  @OneToMany(
    _type => BlogCategoryEntity,
    blogCategroyEntity => blogCategroyEntity.blog,
  )
  public blogCategoryEntity: BlogCategoryEntity[];
}

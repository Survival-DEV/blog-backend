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
  JoinColumn,
} from 'typeorm';
import { BlogCategoryEntity } from './blog-category.entity';

@Entity('blog')
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
  parent_id: number;

  @ManyToOne(_type => UserEntity, user => user.blogEntries, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'author_id' })
  author_id!: UserEntity[] | undefined;

  @OneToMany(
    _type => BlogCategoryEntity,
    blog_categroy_entity => blog_categroy_entity.blog,
  )
  public blog_category_entity: BlogCategoryEntity[];
}

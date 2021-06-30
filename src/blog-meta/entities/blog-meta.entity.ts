import { BlogEntity } from '../../blogs/model/blog.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('blog_meta')
export class BlogMetaEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  key: string;

  @Column()
  content: string;

  @OneToOne(() => BlogEntity, blog => blog.blog_meta)
  @JoinColumn({ name: 'blog_id' })
  blog_id: BlogEntity;
}

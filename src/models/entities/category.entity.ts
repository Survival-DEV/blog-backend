import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BlogEntity } from './blog.entity';

@Entity('categories')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 50 })
  title: string;

  @Column({ nullable: true })
  meta_title: string;

  @Column()
  slug: string;

  @OneToMany(() => BlogEntity, blog => blog.id)
  blogs: BlogEntity[];
}

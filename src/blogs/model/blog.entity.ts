import { type } from "os";
import { UserEntity } from "src/users/user.entity";
import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('blog')
export class BlogEntity {
  @PrimaryGeneratedColumn()
  id: string;

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

  @ManyToOne(type => UserEntity, user => user.blogEntries)
  author_id: UserEntity;
}
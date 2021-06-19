import { BlogEntity } from 'src/blogs/model/blog.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ nullable: true })
  github: string;

  @Column({ nullable: true })
  linked_in: string;

  @Column({ type: 'bytea', nullable: true })
  photo: string ;

  @OneToMany(type => BlogEntity, blogEntity => blogEntity.author_id)
  blogEntries: BlogEntity[];
}

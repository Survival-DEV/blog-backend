import { BlogEntity } from './blog.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string & { __brand: 'user_Id' };

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
  photo: string;

  @OneToMany(_type => BlogEntity, blogEntity => blogEntity.id)
  blogEntries: BlogEntity['id'];
}

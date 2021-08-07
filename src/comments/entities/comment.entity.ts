import { MaxLength, ValidateNested } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeLevelColumn,
  TreeParent,
  UpdateDateColumn,
} from 'typeorm';
import { BlogEntity } from '../../blogs/model/blog.entity';

@Entity('comments')
@Tree('closure-table')
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @Column({ type: 'varchar' })
  @MaxLength(255, { message: 'FIELD_LENGTH_MAX' })
  content: string;

  @TreeChildren({ cascade: ['soft-remove', 'remove', 'recover'] })
  public children: CommentEntity[];

  @TreeParent({ onDelete: 'CASCADE' })
  public parent?: CommentEntity;

  @ManyToOne(() => BlogEntity, blog => blog.comments, {
    onDelete: 'CASCADE',
    cascade: true,
    eager: true,
  })
  @ValidateNested()
  @JoinColumn({ name: 'blog_id' })
  blog_id: BlogEntity;

  @TreeLevelColumn()
  @Column({ default: 2, nullable: true })
  private level: number;
}

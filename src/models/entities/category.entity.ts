import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity('categories')
@Tree('closure-table')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 50 })
  title: string;

  @Column({ nullable: true })
  meta_title: string;

  @Column()
  slug: string;

  @TreeChildren()
  children: CategoryEntity[];

  @TreeParent()
  @JoinColumn({ name: 'parent_id' })
  parent: CategoryEntity;
}

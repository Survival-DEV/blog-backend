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
@Tree('closure-table', {
  closureTableName: 'category_closure',
  ancestorColumnName: column => 'ancestor_' + column.propertyName,
  descendantColumnName: column => 'descendant_' + column.propertyName,
})
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 50 })
  title: string;

  @Column()
  meta_title: string;

  @Column()
  slug: string;

  @TreeChildren()
  children: CategoryEntity[];

  @TreeParent()
  @JoinColumn({ name: 'parent_id' })
  parent: CategoryEntity;
}

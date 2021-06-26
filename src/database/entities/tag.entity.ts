import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tags")
export class TagEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  meta_title: string;

  @Column()
  slug: string;
}

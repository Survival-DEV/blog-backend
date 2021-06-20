import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tags")
export class Tag {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  meta_title: string;

  @Column()
  slug: string;
}

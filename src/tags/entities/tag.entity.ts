import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tags")
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  meta_title: string;

  @Column()
  slug: string;
}

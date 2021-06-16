import {Entity,Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    first_name:string;

    @Column()
    last_name:string;

    @Column({ type: 'varchar' })
    password:string;

    @Column({ type: 'text', unique: true })
    email:string;

    @Column({type:'text'})
    bio:string | null;

    @Column({type:'date'})
    created_at:string;

    @Column()
    github:string | null;

    @Column()
    linked_in:string | null;

    @Column({type:'bytea'})
    photo:string | null;
}
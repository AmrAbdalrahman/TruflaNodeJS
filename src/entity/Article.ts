import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Author} from "./Author";

@Entity({name: "articles"})
export class Article {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    title!: string;

    @Column()
    body!: string;

    @Column()
    author_id!: number;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn({select: false})
    updated_at?: Date;

    @ManyToOne(type => Author, Author => Author.articles)
    @JoinColumn({name: 'author_id'})
    author?: Author;

}

import {
    Column,
    CreateDateColumn,
    Entity, Index,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Author} from "./Author";
import {Comment} from "./Comment";

@Entity({name: "articles"})
export class Article {

    @PrimaryGeneratedColumn()
    id?: number;

    @Index({ fulltext: true })
    @Column()
    title!: string;

    @Index({ fulltext: true })
    @Column()
    body!: string;

    @Column()
    author_id!: number;

    @Column()
    thumbs?: number;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn({select: false})
    updated_at?: Date;

    @ManyToOne(type => Author, author => author.articles)
    @JoinColumn({name: 'author_id'})
    author?: Author;

    @OneToMany(type => Comment, comment => comment.article)
    comments?: Comment[];

}

import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Article} from "./Article";
import {Comment} from "./Comment";

@Entity({name: "authors"})
export class Author {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name!: string;

    @Column()
    job_title!: string;


    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn({select: false})
    updated_at?: Date;

    @OneToMany(type => Article, article => article.author)
    articles?: Article[];

    @OneToMany(type => Comment, comment => comment.user)
    comments?: Comment[];
}

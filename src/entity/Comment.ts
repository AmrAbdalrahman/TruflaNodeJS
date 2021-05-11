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
import {Article} from "./Article";

@Entity({name: "articles"})
export class Comment {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    comment!: string;

    @Column()
    user_id!: number;

    @Column()
    article_id!: number;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn({select: false})
    updated_at?: Date;

    @ManyToOne(type => Author, user => user.comments)
    @JoinColumn({name: 'user_id'})
    user?: Author;

    @ManyToOne(type => Article, article => article.comments)
    @JoinColumn({name: 'article_id'})
    article?: Article;

}

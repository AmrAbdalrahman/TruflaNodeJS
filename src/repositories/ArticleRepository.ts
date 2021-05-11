import {EntityRepository, Repository} from "typeorm";
import {Article} from "../entity/Article";

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {

    async findAuthor(id: any) {

        return await this.findOneOrFail({id})
    };


}

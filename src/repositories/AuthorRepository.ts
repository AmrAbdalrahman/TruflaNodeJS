import {EntityRepository, Repository} from "typeorm";
import {Author} from "../entity/Author";

@EntityRepository(Author)
export class AuthorRepository extends Repository<Author> {

    async findAuthor(id: any) {

        return await this.findOneOrFail({where: {id}, relations: ['articles']})
    };


}

import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {resApi} from "../helpers/utils";
import {Article} from "../entity/Article";

class ArticleController {

    static create = async (req: Request, res: Response) => {

        try {
            const {title, body, author} = req.body;
            const articleRepo = await getRepository(Article);
            const savedArticle = await articleRepo.save({title, body, author_id: author});

            resApi(savedArticle, 201, res, 'saved successfully');

        } catch (e) {
            resApi(null, 400, res, 'error while saving');
        }
    };

    /*static all = async (req: Request, res: Response) => {

        try {
            const authorRepo = await getRepository(Author);
            const allAuthors = await authorRepo.find({order: {created_at: "DESC"}});

            resApi(allAuthors, 200, res);

        } catch (e) {
            resApi(null, 400, res, 'error while retrieving');
        }
    };

    static getAuthorById = async (req: Request, res: Response) => {

        try {
            const id: any = req.params.id;

            const authorRepo = await getCustomRepository(AuthorRepository);
            const author = await authorRepo.findAuthor(id);

            resApi(author, 200, res);

        } catch (e) {
            console.log(e);
            resApi(null, 404, res, 'No author found!');
        }
    };*/

}

export default ArticleController;

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

    static all = async (req: Request, res: Response) => {

        try {
            const articleRepo = await getRepository(Article);
            const allArticles = await articleRepo.find({order: {created_at: "DESC"}, relations: ['author']});

            resApi(allArticles, 200, res);

        } catch (e) {
            resApi(null, 400, res, 'error while retrieving');
        }
    };

    static getArticleById = async (req: Request, res: Response) => {
        try {
            const id: any = req.params.id;
            console.log(id);
            const articleRepo = await getRepository(Article);
            const article = await articleRepo.findOneOrFail({where: {id}, relations: ['author']});
            resApi(article, 200, res);

        } catch (e) {
            resApi(null, 404, res, 'No article found!');
        }
    };

    static search = async (req: Request, res: Response) => {

        try {
            const {text} = req.body;
            const articleRepo = await getRepository(Article);
            const matchedArticles = await articleRepo.createQueryBuilder("article")
                .select()
                .where(`MATCH(title) AGAINST ('${text}' IN BOOLEAN MODE)`)
                .orWhere(`MATCH(body) AGAINST ('${text}' IN BOOLEAN MODE)`)
                .leftJoinAndSelect("article.author", "author")
                .getMany();
            console.log(matchedArticles);

            if (matchedArticles.length)
                resApi(matchedArticles, 200, res);
            else
                resApi(null, 404, res, 'no matched articles found');

        } catch (e) {
            console.log(e);
            resApi(null, 400, res, 'error while searching');
        }
    };

}

export default ArticleController;

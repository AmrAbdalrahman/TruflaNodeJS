import {Request, Response} from "express";
import {getCustomRepository, getRepository} from "typeorm";
import {Author} from "../entity/Author";
import {resApi} from "../helpers/utils";
import {AuthorRepository} from "../repositories/AuthorRepository";


class AuthorController {

    static create = async (req: Request, res: Response) => {

        try {
            const {name, job_title} = req.body;
            const authorRepo = await getRepository(Author);
            const savedAuthor = await authorRepo.save({name, job_title});

            resApi(savedAuthor, 201, res, 'saved successfully');

        } catch (e) {
            resApi(null, 400, res, 'error while saving');
        }
    };

    static all = async (req: Request, res: Response) => {

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
            resApi(null, 404, res, 'No author found!');
        }
    };

}

export default AuthorController;

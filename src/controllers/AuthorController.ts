import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {Author} from "../entity/Author";
import {resApi} from "../helpers/utils";


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

}

export default AuthorController;

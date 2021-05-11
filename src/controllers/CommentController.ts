import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {resApi} from "../helpers/utils";
import {Comment} from "../entity/Comment";

class CommentController {

    static add = async (req: Request, res: Response) => {

        try {
            const {comment, user_id, article_id} = req.body;

            const commentRepo = await getRepository(Comment);
            const savedComment = await commentRepo.save({comment, user_id, article_id});

            resApi(savedComment, 201, res, 'saved successfully');

        } catch (e) {
            console.log(e);
            resApi(null, 400, res, 'error while saving');
        }
    };

}

export default CommentController;

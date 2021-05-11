import express from 'express';
import validate from "../middlewares/validate";
import {check, CustomValidator} from "express-validator";
import {getCustomRepository} from "typeorm";
import {AuthorRepository} from "../repositories/AuthorRepository";
import ArticleController from "../controllers/ArticleController";

const isExistsAuthorId: CustomValidator = async value => {
    try {
        const authorRepo = await getCustomRepository(AuthorRepository);
        await authorRepo.findAuthor(value);
        return true;
    } catch (e) {
        throw new Error('Author not Exist!');
    }
};

const router = express();

router.post('/create', [
    check('title').not().isEmpty().withMessage('title is required'),
    check('body').not().isEmpty().withMessage('body is required'),
    check('author').custom(isExistsAuthorId),
], validate, ArticleController.create);

router.get('/all', ArticleController.all);
router.get('/:id', ArticleController.getArticleById);


export default router;

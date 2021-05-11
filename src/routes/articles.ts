import express from 'express';
import validate from "../middlewares/validate";
import {check, CustomValidator} from "express-validator";
import {getCustomRepository} from "typeorm";
import {AuthorRepository} from "../repositories/AuthorRepository";
import ArticleController from "../controllers/ArticleController";
import {ArticleRepository} from "../repositories/ArticleRepository";
import CommentController from "../controllers/CommentController";

const isExistsUserId: CustomValidator = async value => {
    try {
        const authorRepo = await getCustomRepository(AuthorRepository);
        await authorRepo.findAuthor(value);
        return true;
    } catch (e) {
        throw new Error('User not Exist!');
    }
};

const isExistsArticleId: CustomValidator = async value => {
    try {
        const articleRepo = await getCustomRepository(ArticleRepository);
        await articleRepo.findAuthor(value);
        return true;
    } catch (e) {
        throw new Error('Article not Exist!');
    }
};

const router = express();

router.post('/create', [
    check('title').not().isEmpty().withMessage('title is required'),
    check('body').not().isEmpty().withMessage('body is required'),
    check('author_id').custom(isExistsUserId),
], validate, ArticleController.create);

router.get('/all', ArticleController.all);
router.get('/:id', ArticleController.getArticleById);

router.post('/search', [
    check('text').not().isEmpty().withMessage('text is required'),
], validate, ArticleController.search);

router.post('/thumbs', [
    check('type').isIn(["up", "down"]).withMessage('type must be up or down'),
    check('article_id').custom(isExistsArticleId),
], validate, ArticleController.thumbs);

//add comment
router.post('/addComment', [
    check('comment').not().isEmpty().withMessage('comment is required'),
    check('user_id').custom(isExistsUserId),
    check('article_id').custom(isExistsArticleId),
], validate, CommentController.add);


export default router;

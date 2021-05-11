import express from 'express';
import validate from "../middlewares/validate";
import {check} from "express-validator";
import AuthorController from "../controllers/AuthorController";


const router = express();

router.post('/create', [
    check('name').not().isEmpty().withMessage('name is required'),
    check('job_title').not().isEmpty().withMessage('job_title is required'),
], validate, AuthorController.create);

router.get('/all', AuthorController.all);
router.get('/:id', AuthorController.getAuthorById);


export default router;

import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';

export default (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error: any = {};
        errors.array().map((err) => error[err.param] = err.msg);
        return res.status(422).json({message: error[Object.keys(error)[0]], errors: error});
    }

    next();
};


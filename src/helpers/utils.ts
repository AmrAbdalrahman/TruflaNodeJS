import {Response} from "express";

export function resApi(data: any, code: number, res: Response, message: string = '') {
    return res.status(code).json({
        data: data,
        message: message,
    });
}

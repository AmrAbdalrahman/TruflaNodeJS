import {Request, Response, Router} from "express";
import {resApi} from "../helpers/utils";

const routes = Router();

routes.get("/api/v1/health-check", (req: Request, res: Response) => {
    resApi('', 200, res, "success health checkqq");
});


export default routes;

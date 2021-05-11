import {Request, Response, Router} from "express";
import authors from "./authors";
import articles from "./articles";
import {resApi} from "../helpers/utils";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
    resApi(null, 200, res, "check the documentation https://documenter.getpostman.com/view/5140236/TzRUA6U9 ");
});

routes.get("/api/v1/health-check", (req: Request, res: Response) => {
    resApi('', 200, res, "success health check");
});

routes.use("/api/v1/authors", authors);
routes.use("/api/v1/articles", articles);

export default routes;

import {Request, Response, Router} from "express";
import authors from "./authors";
import articles from "./articles";
import {resApi} from "../helpers/utils";

const routes = Router();

routes.get("/api/v1/health-check", (req: Request, res: Response) => {
    resApi('', 200, res, "success health check");
});

routes.use("/api/v1/authors", authors);
routes.use("/api/v1/articles", articles);

export default routes;

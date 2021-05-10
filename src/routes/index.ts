import {Request, Response, Router} from "express";
import authors from "./authors";
import {resApi} from "../helpers/utils";

const routes = Router();

routes.get("/api/v1/health-check", (req: Request, res: Response) => {
    resApi('', 200, res, "success health check");
});

routes.use("/api/v1/authors", authors);

export default routes;

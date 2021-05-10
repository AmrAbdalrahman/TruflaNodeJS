import * as dotenv from "dotenv";

dotenv.config({path: __dirname + '/.env'});
import express, {Application} from 'express';
import * as bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes";

const app: Application = express();
// Call midlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json())

//Set all index from index folder
app.use("/", routes);


export {app};

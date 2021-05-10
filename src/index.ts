import "reflect-metadata";
import {createConnection} from "typeorm";
import {app} from "./app";

const start = async () => {
    try {
        await createConnection();
        console.log('connected to mysql db');
    } catch (err) {
        console.log(err);
    }

    const port = Number(process.env.PORT || 4000);
    app.listen(port, () => {
        console.log(`server started on port ${port}`);
    });
};

start();

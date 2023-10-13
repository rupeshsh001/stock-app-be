import express from "express";
import cors from "cors";
import { DBConnection } from "./db/dbConnection.js";
import { router } from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cors());
app.use(router);

const port = 4000;

app.listen(port, () => {
    DBConnection();
    console.info("Stocks App.");
    console.log(`app listening on port ${port}`);
});

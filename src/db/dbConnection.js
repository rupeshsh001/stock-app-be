import mongoose from "mongoose";
import { host, database } from "../constants/database.js";

export const DBConnection = () => {
    mongoose.connect(`${host}/${database}`);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "can't able to connect to database "));
    db.once("open", function () {
        console.log(`${database} Database connected successfully!!`);
    });
};

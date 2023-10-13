import dotenv from "dotenv";

dotenv.config();
export const host = process.env.DATABASE_URL || "mongodb://localhost:27017";
export const database = process.env.DATABASE_NAME || "stockApp";

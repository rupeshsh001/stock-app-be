import { stockRouter } from "./stockRoutes.js";
import { Router } from "express";

export const router = Router();

router.use("/stocks", stockRouter);

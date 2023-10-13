import express from "express";
import {
    addStock,
    getAllStock,
    getStockById,
    getStockByName,
    getStocksByLiked,
    updateStockById,
} from "../controller/stock.js";
import { SuccessResponse } from "../helper/success.js";
import { FailureResponse } from "../helper/failure.js";

export const stockRouter = express.Router();

stockRouter.post("/add", async (req, res) => {
    try {
        const result = await addStock(req.body);
        return res.status(201).send(new SuccessResponse(201, "Stocks Added Successfully!!", result));
    } catch (error) {
        console.error(error.message);
        return res.status(500).send(new FailureResponse(500, error.message, error.error));
    }
});

stockRouter.get("/", async (req, res) => {
    try {
        const result = await getAllStock();
        return res.status(200).send(new SuccessResponse(200, "All Stocks fetch Successfully!!", result));
    } catch (error) {
        console.error(error.message);
        return res.status(500).send(new FailureResponse(500, error.message, error.error));
    }
});

stockRouter.get("/search", async (req, res) => {
    try {
        const { stockName } = req.query;
        const result = await getStockByName(stockName);
        return res.status(200).send(new SuccessResponse(200, "Stocks by name fetch Successfully!!", result));
    } catch (error) {
        console.error(error.message);
        return res.status(500).send(new FailureResponse(500, error.message, error.error));
    }
});

stockRouter.get("/liked", async (req, res) => {
    try {
        const { fav } = req.query;
        let favBool = fav === "true";
        const result = await getStocksByLiked(favBool);
        return res.status(200).send(new SuccessResponse(200, "Stocks by name fetch Successfully!!", result));
    } catch (error) {
        console.error(error.message);
        return res.status(500).send(new FailureResponse(500, error.message, error.error));
    }
});

stockRouter.get("/:id", async (req, res) => {
    try {
        const result = await getStockById(req.params.id);
        return res.status(200).send(new SuccessResponse(200, "Stocks by id fetch Successfully!!", result));
    } catch (error) {
        console.error(error.message);
        return res.status(500).send(new FailureResponse(500, error.message, error.error));
    }
});

stockRouter.patch("/:id", async (req, res) => {
    try {
        const result = await updateStockById(req.params.id, req.body);
        return res.status(200).send(new SuccessResponse(200, "Stocks by id fetch Successfully!!", result));
    } catch (error) {
        console.error(error.message);
        return res.status(500).send(new FailureResponse(500, error.message, error.error));
    }
});

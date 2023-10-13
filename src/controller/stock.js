import { stockModel } from "../db/models/stockSchema.js";
import { Exception } from "../helper/exception.js";
import { AddStockValidator } from "../service/joi.validator.js";

export const addStock = async (body) => {
    const validate = AddStockValidator(body);
    if (validate.error) {
        throw new Exception(validate.error.message, 400, validate.error.details[0]);
    }

    const checkStock = await stockModel.find({ stockName: body.stockName });

    if (checkStock.length) {
        throw new Exception("Stock already exist", 403, "Forbidden Error");
    }

    const stockDetails = await new stockModel(body).save();

    return stockDetails;
};

export const getAllStock = async () => {
    const stocks = await stockModel.find();

    if (!stocks.length) {
        throw new Exception("There are no stocks at the moment. Please add stock using /add", 404, "Not Found");
    }

    const stocksWithRandomPrices = stocks.map(async (stock) => {
        const currentTime = new Date().getTime();
        const stockAge = currentTime - stock.createdAt.getTime();
        const shouldUpdatePrice = stockAge > 60000;

        if (shouldUpdatePrice) {
            const randomPrice = Math.floor(Math.random() * 11) - 5;
            const prevPrice = stock.price;
            const newStockPrice = stock.price + randomPrice;
            stock.price = newStockPrice;
            stock.previousPrice = prevPrice;
            await stock.save();
        }

        return {
            ...stock.toObject(),
            price: shouldUpdatePrice ? stock.price : stock.price,
        };
    });

    await Promise.all(stocksWithRandomPrices);

    return stocks;
};

export const getStockById = async (stockId) => {
    const stocksById = await stockModel.findById(stockId);

    if (!stocksById) {
        throw new Exception("stocks not found", 404, "Not Found");
    }

    return stocksById;
};

export const getStockByName = async (stockName) => {
    const stocksByName = await stockModel.aggregate([{ $match: { stockName: { $regex: stockName, $options: "i" } } }]);
    if (!stocksByName) {
        throw new Exception("stocks not found", 404, "Not Found");
    }
    return stocksByName;
};

export const updateStockById = async (stockId, body) => {
    const stocksById = await stockModel.findById(stockId);

    if (!stocksById) {
        throw new Exception("stocks not found", 404, "Not Found");
    }

    const updatedStock = await stockModel.findByIdAndUpdate(stockId, body, {
        new: true,
    });

    return updatedStock;
};

export const getStocksByLiked = async (liked) => {
    if (liked) {
        const stocks = await stockModel.find({ liked: true });
        return stocks;
    } else {
        const stocks = await stockModel.find();
        return stocks;
    }
};

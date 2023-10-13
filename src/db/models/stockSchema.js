import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
    stockName: { type: String, required: true },
    price: { type: Number, required: true },
    previousPrice: { type: Number, default: 0 },
    liked: { type: Boolean, default: false },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const stockModel = mongoose.model("stock", stockSchema);

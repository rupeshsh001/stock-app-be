import Joi from "joi";

export const AddStockValidator = (body) => {
    const schema = Joi.object().keys({
        stockName: Joi.string().required(),
        price: Joi.number().required(),
    });

    return schema.validate(body);
};

// src/validators/inventoryValidator.ts
import Joi from "joi";

export const createInventorySchema = Joi.object({
	product: Joi.string().required(),
	quantity: Joi.number().min(0).required(),
});

export const updateInventorySchema = Joi.object({
	product: Joi.string(),
	quantity: Joi.number().min(0),
});

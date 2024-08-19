import Joi from "joi";

export const createOrderSchema = Joi.object({
	user: Joi.string().required(),
	cart: Joi.string().required(),
	payment: Joi.string().required(),
	shipping: Joi.string().required(),
	status: Joi.string().required(),
	totalAmount: Joi.number().required(),
	products: Joi.array()
		.items(
			Joi.object({
				product: Joi.string().required(),
				quantity: Joi.number().min(1).required(),
			}),
		)
		.required(),
});

export const updateOrderSchema = Joi.object({
	user: Joi.string(),
	cart: Joi.string(),
	payment: Joi.string(),
	shipping: Joi.string(),
	status: Joi.string(),
	totalAmount: Joi.number(),
	products: Joi.array().items(
		Joi.object({
			product: Joi.string(),
			quantity: Joi.number().min(1),
		}),
	),
});

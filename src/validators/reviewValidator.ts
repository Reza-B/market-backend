import Joi from "joi";

export const reviewSchema = Joi.object({
	user: Joi.string().required(),
	product: Joi.string().required(),
	rating: Joi.number().integer().min(1).max(5).required(),
	comment: Joi.string().optional(),
	createdAt: Joi.date().optional(),
});

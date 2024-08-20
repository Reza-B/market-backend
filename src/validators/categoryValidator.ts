import Joi from "joi";

export const createCategorySchema = Joi.object({
	name: Joi.string().required().messages({
		"string.empty": "Category name is required",
		"any.required": "Category name is required",
	}),
	slug: Joi.string().required().messages({
		"string.empty": "Category slug is required",
		"any.required": "Category slug is required",
	}),
	products: Joi.array().items(Joi.string()).optional(),
});

export const updateCategorySchema = Joi.object({
	name: Joi.string().optional(),
	slug: Joi.string().optional(),
	products: Joi.array().items(Joi.string()).optional(),
});

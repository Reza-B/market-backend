import Joi from "joi";

// اعتبارسنجی درخواست ایجاد یا به‌روزرسانی محصول
export const productSchema = Joi.object({
	name: Joi.string().required(),
	mainImage: Joi.string().uri().required(),
	images: Joi.array().items(Joi.string().uri()).optional(),
	rating: Joi.number().min(0).max(5).optional(),
	ratingCount: Joi.number().integer().min(0).optional(),
	keyFeatures: Joi.array().items(Joi.string()).required(),
	sizes: Joi.array().items(Joi.string()).optional(),
	description: Joi.string().required(),
	price: Joi.number().min(0).required(),
	category: Joi.string().required(),
});

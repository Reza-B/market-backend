import Joi from "joi";

// اعتبارسنجی درخواست ایجاد یا به‌روزرسانی نظر
export const reviewSchema = Joi.object({
	product: Joi.string().required(),
	user: Joi.string().required(),
	rating: Joi.number().min(1).max(5).required(),
	comment: Joi.string().optional(),
});

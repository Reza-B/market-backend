import Joi from "joi";

// اعتبارسنجی درخواست ایجاد یا به‌روزرسانی دسته‌بندی
export const categorySchema = Joi.object({
	name: Joi.string().min(2).max(50).required(),
	description: Joi.string().optional(),
});

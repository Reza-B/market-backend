import Joi from "joi";

// اعتبارسنجی درخواست ایجاد یا به‌روزرسانی تخفیف
export const discountSchema = Joi.object({
	code: Joi.string().required(),
	percentage: Joi.number().min(0).max(100).required(),
	validFrom: Joi.date().required(),
	validTo: Joi.date().required(),
});

import Joi from "joi";

// اعتبارسنجی درخواست ایجاد یا به‌روزرسانی آیتم موجودی
export const inventorySchema = Joi.object({
	product: Joi.string().required(),
	quantity: Joi.number().integer().min(0).required(),
});

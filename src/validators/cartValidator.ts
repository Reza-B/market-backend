import Joi from "joi";

// اعتبارسنجی درخواست ایجاد آیتم در سبد خرید
export const cartItemSchema = Joi.object({
	product: Joi.string().required(),
	quantity: Joi.number().integer().min(1).required(),
});

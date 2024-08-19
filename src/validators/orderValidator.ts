import Joi from "joi";

// اعتبارسنجی درخواست ایجاد سفارش
export const orderSchema = Joi.object({
	user: Joi.string().required(),
	cart: Joi.string().required(),
	shipping: Joi.string().required(),
	payment: Joi.string().required(),
	status: Joi.string()
		.valid("pending", "shipped", "delivered", "cancelled")
		.required(),
});

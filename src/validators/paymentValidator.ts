import Joi from "joi";

// اعتبارسنجی درخواست ایجاد پرداخت
export const paymentSchema = Joi.object({
	method: Joi.string()
		.valid("credit_card", "paypal", "bank_transfer")
		.required(),
	amount: Joi.number().min(0).required(),
	status: Joi.string().valid("pending", "completed", "failed").required(),
});

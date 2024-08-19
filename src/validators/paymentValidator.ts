import Joi from "joi";

export const createPaymentSchema = Joi.object({
	order: Joi.string().required(),
	amount: Joi.number().required(),
	method: Joi.string()
		.valid("credit_card", "paypal", "bank_transfer")
		.required(),
	status: Joi.string().valid("pending", "completed", "failed").required(),
	paymentDate: Joi.date().iso(),
});

export const updatePaymentSchema = Joi.object({
	order: Joi.string(),
	amount: Joi.number(),
	method: Joi.string().valid("credit_card", "paypal", "bank_transfer"),
	status: Joi.string().valid("pending", "completed", "failed"),
	paymentDate: Joi.date().iso(),
});

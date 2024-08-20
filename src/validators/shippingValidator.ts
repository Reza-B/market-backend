import Joi from "joi";

export const shippingSchema = Joi.object({
	user: Joi.string().required(),
	address: Joi.string().required(),
	city: Joi.string().required(),
	postalCode: Joi.string().required(),
	shippingMethod: Joi.string()
		.valid("standard", "express", "overnight")
		.required(),
});

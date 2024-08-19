import Joi from "joi";

// اعتبارسنجی درخواست ایجاد یا به‌روزرسانی اطلاعات ارسال
export const shippingSchema = Joi.object({
	address: Joi.string().required(),
	city: Joi.string().required(),
	postalCode: Joi.string().required(),
	country: Joi.string().required(),
	shippingMethod: Joi.string().valid("standard", "express").required(),
});

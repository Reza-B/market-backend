// src/validators/discountValidator.ts
import Joi from "joi";

export const createDiscountSchema = Joi.object({
	code: Joi.string().required(),
	percentage: Joi.number().min(0).max(100).required(),
	validFrom: Joi.date().required(),
	validUntil: Joi.date().required(),
	usageLimit: Joi.number().min(1).required(),
});

export const updateDiscountSchema = Joi.object({
	code: Joi.string(),
	percentage: Joi.number().min(0).max(100),
	validFrom: Joi.date(),
	validUntil: Joi.date(),
	usageLimit: Joi.number().min(1),
	isActive: Joi.boolean(),
});

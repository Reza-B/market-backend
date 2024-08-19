import Joi from "joi";

// اعتبارسنجی شماره تلفن
export const phoneSchema = Joi.object({
	phone: Joi.string()
		.pattern(/^[0-9]{10,15}$/)
		.required(), // شماره تلفن باید 10 تا 15 رقم باشد
});

// اعتبارسنجی اطلاعات ثبت‌نام
export const registerSchema = Joi.object({
	phone: Joi.string()
		.pattern(/^[0-9]{10,15}$/)
		.required(), // شماره تلفن باید 10 تا 15 رقم باشد
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	verificationCode: Joi.string().length(6).required(), // کد تأیید باید 6 رقم باشد
});

// اعتبارسنجی اطلاعات ورود
export const loginSchema = Joi.object({
	phone: Joi.string()
		.pattern(/^[0-9]{10,15}$/)
		.required(), // شماره تلفن باید 10 تا 15 رقم باشد
	password: Joi.string().min(6).required(),
});

// اعتبارسنجی درخواست ارسال دوباره کد تأیید
export const resendVerificationCodeSchema = Joi.object({
	phone: Joi.string()
		.pattern(/^[0-9]{10,15}$/)
		.required(), // شماره تلفن باید 10 تا 15 رقم باشد
});

// اعتبارسنجی اطلاعات ویرایش کاربر
export const updateUserSchema = Joi.object({
	email: Joi.string().email().optional(),
	password: Joi.string().min(6).optional(),
	firstName: Joi.string().optional(),
	lastName: Joi.string().optional(),
	profilePicture: Joi.string().uri().optional(),
	gender: Joi.string().valid("male", "female", "other").optional(),
});

import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import {
	phoneSchema,
	registerSchema,
	loginSchema,
	resendVerificationCodeSchema,
	updateUserSchema,
	codeSchema,
} from "../validators/userValidator";
import bcrypt from "bcryptjs";
import { sendVerificationCode } from "../services/notificationService";
import { generateToken, verifyToken } from "../services/authService";
import { uploadImage } from "../services/uploadImage";

export const upload = uploadImage({ dest: "profile_pictures" });

// ورود کاربر با شماره تلفن
export const handlePhoneInput = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { phone } = req.body;

		// اعتبارسنجی شماره تلفن
		const { error } = phoneSchema.validate({ phone });
		if (error)
			return res
				.status(400)
				.json({ status: "error", message: error.details[0].message });

		// جستجوی کاربر با شماره تلفن
		const user = await User.findOne({ phone });

		if (user) {
			if (user.isPhoneVerified) {
				return res
					.status(400)
					.json({ status: "error", message: "Phone number already in use" });
			} else {
				// حذف کاربر قبلی و ادامه ثبت‌نام
				await User.deleteOne({ phone });
				await sendVerificationCode(phone);
				return res
					.status(200)
					.json({ status: "success", message: "Proceed with registration" });
			}
		}

		// ایجاد کاربر جدید و ارسال کد تأیید
		await sendVerificationCode(phone);
		res
			.status(200)
			.json({ status: "success", message: "Verification code sent" });
	} catch (error) {
		next(error);
	}
};

// ارسال دوباره کد تأیید
export const resendVerificationCode = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { phone } = req.body;

		// اعتبارسنجی شماره تلفن
		const { error } = resendVerificationCodeSchema.validate({ phone });
		if (error)
			return res
				.status(400)
				.json({ status: "error", message: error.details[0].message });

		const user = await User.findOne({ phone });
		if (!user) {
			return res
				.status(404)
				.json({ status: "error", message: "User not found" });
		}

		await sendVerificationCode(phone);

		res
			.status(200)
			.json({ status: "success", message: "Verification code resent" });
	} catch (error) {
		next(error);
	}
};

// تکمیل ثبت‌نام
export const completeRegistration = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { phone, verificationCode, firstName, lastName, password } = req.body;

		// اعتبارسنجی ورودی
		const { error } = registerSchema.validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ status: "error", message: error.details[0].message });

		const user = await User.findOne({ phone });
		if (!user) {
			return res
				.status(404)
				.json({ status: "error", message: "User not found" });
		}

		if (user.verificationCode !== verificationCode) {
			return res
				.status(400)
				.json({ status: "error", message: "Invalid verification code" });
		}

		user.firstName = firstName;
		user.lastName = lastName;
		user.password = password;
		user.isPhoneVerified = true;
		user.verificationCode = undefined;

		await user.save();

		const token = generateToken(user);

		res.status(200).json({
			status: "success",
			message: "Registration complete",
			token,
		});
	} catch (error) {
		next(error);
	}
};

// تکمیل ورود با رمز عبور
export const loginWithPassword = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { phone, password } = req.body;

		// اعتبارسنجی ورودی
		const { error } = loginSchema.validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ status: "error", message: error.details[0].message });

		const user = await User.findOne({ phone });
		if (!user) {
			return res
				.status(404)
				.json({ status: "error", message: "User not found" });
		}

		if (!user.isPhoneVerified) {
			return res
				.status(400)
				.json({ status: "error", message: "Phone number not verified" });
		}

		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res
				.status(401)
				.json({ status: "error", message: "Invalid password" });
		}

		const token = generateToken(user); // تولید توکن JWT
		res
			.status(200)
			.json({ status: "success", message: "Login successful", token });
	} catch (error) {
		next(error);
	}
};

// درخواست کد تأیید برای ورود
export const requestVerificationCodeForLogin = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { phone } = req.body;

		// اعتبارسنجی شماره تلفن
		const { error } = resendVerificationCodeSchema.validate({ phone });
		if (error)
			return res
				.status(400)
				.json({ status: "error", message: error.details[0].message });

		const user = await User.findOne({ phone });
		if (!user || !user.isPhoneVerified) {
			return res.status(404).json({
				status: "error",
				message: "User not found or phone number not verified",
			});
		}

		await sendVerificationCode(phone);

		res
			.status(200)
			.json({ status: "success", message: "Verification code sent" });
	} catch (error) {
		next(error);
	}
};

// تکمیل ورود با کد تائید
export const loginWithCode = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { phone, verificationCode } = req.body;

		// اعتبارسنجی ورودی
		const { error } = codeSchema.validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ status: "error", message: error.details[0].message });

		const user = await User.findOne({ phone });
		if (!user) {
			return res
				.status(404)
				.json({ status: "error", message: "User not found" });
		}

		if (!user.isPhoneVerified) {
			return res
				.status(400)
				.json({ status: "error", message: "Phone number not verified" });
		}

		if (user.verificationCode !== verificationCode) {
			return res
				.status(400)
				.json({ status: "error", message: "Invalid verification code" });
		}

		const token = generateToken(user); // تولید توکن JWT
		res
			.status(200)
			.json({ status: "success", message: "Login successful", token });
	} catch (error) {
		next(error);
	}
};

// دریافت اطلاعات کاربر
export const getUserInfo = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token)
			return res
				.status(401)
				.json({ status: "error", message: "No token provided" });

		const decoded = verifyToken(token);
		console.log(decoded);
		if (!decoded)
			return res
				.status(401)
				.json({ status: "error", message: "Invalid token" });

		const user = await User.findById(decoded.userId);
		if (!user)
			return res
				.status(404)
				.json({ status: "error", message: "User not found" });

		res.status(200).json({
			status: "success",
			user: {
				id: user._id,
				phone: user.phone,
				firstName: user.firstName,
				lastname: user.lastName,
				email: user.email,
				profilePicture: user.profilePicture,
				gender: user.gender,
			},
		});
	} catch (error) {
		next(error);
	}
};

// حذف کاربر
export const deleteUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;

		const user = await User.findByIdAndDelete(id);
		if (!user)
			return res
				.status(404)
				.json({ status: "error", message: "User not found" });

		res
			.status(200)
			.json({ status: "success", message: "User deleted successfully" });
	} catch (error) {
		next(error);
	}
};

// ویرایش اطلاعات کاربر
export const updateUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const updates = req.body;

		// Validate input
		const { error } = updateUserSchema.validate(updates);
		if (error)
			return res
				.status(400)
				.json({ status: "error", message: error.details[0].message });

		// Check if user exists
		const user = await User.findById(id);
		if (!user)
			return res
				.status(404)
				.json({ status: "error", message: "User not found" });

		// Handle profile picture
		if (req.file) {
			user.profilePicture = req.file.path;
		}

		if (updates.password) {
			user.password = updates.password;
		}

		Object.assign(user, updates);

		await user.save();

		res.status(200).json({
			status: "success",
			message: "User updated successfully",
			user: {
				id: user._id,
				phone: user.phone,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				profilePicture: user.profilePicture,
				gender: user.gender,
			},
		});
	} catch (error) {
		next(error);
	}
};

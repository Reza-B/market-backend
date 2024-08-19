import { Request, Response, NextFunction } from "express";
import { ValidationError } from "joi";

// اینترفیس برای ساختار خطای سفارشی
interface CustomError extends Error {
	statusCode?: number;
	details?: any; // برای اضافه کردن جزئیات اضافی
}

// میدلور مدیریت خطا
const errorMiddleware = (
	err: CustomError,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// اگر خطا از نوع Joi ValidationError باشد
	if (err instanceof ValidationError) {
		return res.status(400).json({
			status: "error",
			message: "Validation Error",
			details: err.details.map((detail) => ({
				message: detail.message,
				path: detail.path,
			})),
		});
	}

	// اگر خطا دارای statusCode باشد (خطاهای سفارشی)
	if (err.statusCode) {
		return res.status(err.statusCode).json({
			status: "error",
			message: err.message,
			details: err.details || null,
		});
	}

	// مدیریت خطاهای مربوط به درخواست‌های غیرمجاز
	if (err.name === "UnauthorizedError") {
		return res.status(401).json({
			status: "error",
			message: "Unauthorized access",
		});
	}

	// مدیریت خطاهای مربوط به Not Found
	if (err.message === "Not Found") {
		return res.status(404).json({
			status: "error",
			message: "Resource not found",
		});
	}

	// مدیریت خطاهای داخلی سرور (پیش‌فرض)
	console.error(err);
	res.status(500).json({
		status: "error",
		message: "Internal Server Error",
	});
};

export default errorMiddleware;

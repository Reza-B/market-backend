import { Request, Response, NextFunction } from "express";
import Payment from "../models/paymentModel";
import {
	createPaymentSchema,
	updatePaymentSchema,
} from "../validators/paymentValidator";

// ایجاد یک پرداخت جدید
export const createPayment = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { error } = createPaymentSchema.validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ status: "error", message: error.details[0].message });

		const payment = new Payment(req.body);
		await payment.save();

		res.status(201).json({ status: "success", data: payment });
	} catch (error) {
		next(error);
	}
};

// دریافت تمام پرداخت‌ها
export const getAllPayments = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const payments = await Payment.find().populate("order");
		res.status(200).json({ status: "success", data: payments });
	} catch (error) {
		next(error);
	}
};

// دریافت پرداخت با شناسه خاص
export const getPaymentById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const payment = await Payment.findById(id).populate("order");

		if (!payment) {
			return res
				.status(404)
				.json({ status: "error", message: "Payment not found" });
		}

		res.status(200).json({ status: "success", data: payment });
	} catch (error) {
		next(error);
	}
};

// به‌روزرسانی پرداخت
export const updatePayment = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const { error } = updatePaymentSchema.validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ status: "error", message: error.details[0].message });

		const payment = await Payment.findByIdAndUpdate(id, req.body, {
			new: true,
		});

		if (!payment) {
			return res
				.status(404)
				.json({ status: "error", message: "Payment not found" });
		}

		res.status(200).json({ status: "success", data: payment });
	} catch (error) {
		next(error);
	}
};

// حذف پرداخت
export const deletePayment = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const payment = await Payment.findByIdAndDelete(id);

		if (!payment) {
			return res
				.status(404)
				.json({ status: "error", message: "Payment not found" });
		}

		res
			.status(200)
			.json({ status: "success", message: "Payment deleted successfully" });
	} catch (error) {
		next(error);
	}
};

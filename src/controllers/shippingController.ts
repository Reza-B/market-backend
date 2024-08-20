import { Request, Response, NextFunction } from "express";
import Shipping from "../models/shippingModel";
import { shippingSchema } from "../validators/shippingValidator";

// ایجاد یک سفارش جدید
export const createShipping = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { error } = shippingSchema.validate(req.body);
		if (error) {
			return res
				.status(400)
				.json({ status: "error", message: error.details[0].message });
		}

		const shipping = new Shipping(req.body);
		await shipping.save();
		res.status(201).json({ status: "success", data: shipping });
	} catch (error) {
		next(error);
	}
};

// به‌روزرسانی سفارش بر اساس شناسه
export const updateShipping = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const { error } = shippingSchema.validate(req.body, { abortEarly: false });
		if (error) {
			return res
				.status(400)
				.json({ status: "error", message: error.details[0].message });
		}

		const shipping = await Shipping.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		if (!shipping) {
			return res
				.status(404)
				.json({ status: "error", message: "Shipping not found" });
		}

		res.status(200).json({ status: "success", data: shipping });
	} catch (error) {
		next(error);
	}
};

// دریافت اطلاعات یک سفارش بر اساس شناسه
export const getShippingById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const shipping = await Shipping.findById(id).populate("user");

		if (!shipping) {
			return res
				.status(404)
				.json({ status: "error", message: "Shipping not found" });
		}

		res.status(200).json({ status: "success", data: shipping });
	} catch (error) {
		next(error);
	}
};

// دریافت تمام سفارشات
export const getAllShippings = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const shippings = await Shipping.find().populate("user");
		res.status(200).json({ status: "success", data: shippings });
	} catch (error) {
		next(error);
	}
};

// حذف یک سفارش بر اساس شناسه
export const deleteShipping = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const shipping = await Shipping.findByIdAndDelete(id);

		if (!shipping) {
			return res
				.status(404)
				.json({ status: "error", message: "Shipping not found" });
		}

		res
			.status(204)
			.json({ status: "success", message: "Shipping deleted successfully" });
	} catch (error) {
		next(error);
	}
};

// src/controllers/discountController.ts
import { Request, Response, NextFunction } from "express";
import Discount from "../models/discountModel";
import {
	createDiscountSchema,
	updateDiscountSchema,
} from "../validators/discountValidator";

// ایجاد یک کد تخفیف جدید
export const createDiscount = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { error } = createDiscountSchema.validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ status: "error", message: error.details[0].message });

		const discount = new Discount(req.body);
		await discount.save();

		res.status(201).json({ status: "success", data: discount });
	} catch (error) {
		next(error);
	}
};

// دریافت همه کدهای تخفیف
export const getAllDiscounts = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const discounts = await Discount.find();
		res.status(200).json({ status: "success", data: discounts });
	} catch (error) {
		next(error);
	}
};

// دریافت کد تخفیف بر اساس ID
export const getDiscountById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const discount = await Discount.findById(id);

		if (!discount) {
			return res
				.status(404)
				.json({ status: "error", message: "Discount not found" });
		}

		res.status(200).json({ status: "success", data: discount });
	} catch (error) {
		next(error);
	}
};

// به‌روزرسانی کد تخفیف
export const updateDiscount = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const { error } = updateDiscountSchema.validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ status: "error", message: error.details[0].message });

		const discount = await Discount.findByIdAndUpdate(id, req.body, {
			new: true,
		});

		if (!discount) {
			return res
				.status(404)
				.json({ status: "error", message: "Discount not found" });
		}

		res.status(200).json({ status: "success", data: discount });
	} catch (error) {
		next(error);
	}
};

// حذف کد تخفیف
export const deleteDiscount = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const discount = await Discount.findByIdAndDelete(id);

		if (!discount) {
			return res
				.status(404)
				.json({ status: "error", message: "Discount not found" });
		}

		res
			.status(200)
			.json({ status: "success", message: "Discount deleted successfully" });
	} catch (error) {
		next(error);
	}
};

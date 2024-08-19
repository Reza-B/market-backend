// src/controllers/inventoryController.ts
import { Request, Response, NextFunction } from "express";
import Inventory from "../models/inventoryModel";
import {
	createInventorySchema,
	updateInventorySchema,
} from "../validators/inventoryValidator";

// ایجاد یک موجودی جدید برای محصول
export const createInventory = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { error } = createInventorySchema.validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ status: "error", message: error.details[0].message });

		const inventory = new Inventory(req.body);
		await inventory.save();

		res.status(201).json({ status: "success", data: inventory });
	} catch (error) {
		next(error);
	}
};

// دریافت همه موجودی‌های محصولات
export const getAllInventories = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const inventories = await Inventory.find().populate("product");
		res.status(200).json({ status: "success", data: inventories });
	} catch (error) {
		next(error);
	}
};

// دریافت موجودی یک محصول خاص بر اساس ID
export const getInventoryById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const inventory = await Inventory.findById(id).populate("product");

		if (!inventory) {
			return res
				.status(404)
				.json({ status: "error", message: "Inventory not found" });
		}

		res.status(200).json({ status: "success", data: inventory });
	} catch (error) {
		next(error);
	}
};

// به‌روزرسانی موجودی محصول
export const updateInventory = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const { error } = updateInventorySchema.validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ status: "error", message: error.details[0].message });

		const inventory = await Inventory.findByIdAndUpdate(id, req.body, {
			new: true,
		});

		if (!inventory) {
			return res
				.status(404)
				.json({ status: "error", message: "Inventory not found" });
		}

		res.status(200).json({ status: "success", data: inventory });
	} catch (error) {
		next(error);
	}
};

// حذف موجودی یک محصول
export const deleteInventory = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const inventory = await Inventory.findByIdAndDelete(id);

		if (!inventory) {
			return res
				.status(404)
				.json({ status: "error", message: "Inventory not found" });
		}

		res
			.status(200)
			.json({ status: "success", message: "Inventory deleted successfully" });
	} catch (error) {
		next(error);
	}
};

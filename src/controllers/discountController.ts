import { Request, Response } from "express";
import Discount from "../models/discountModel";

export const createDiscount = async (req: Request, res: Response) => {
	try {
		const discount = new Discount(req.body);
		await discount.save();
		res.status(201).json(discount);
	} catch (error) {
		res.status(500).json({ error: "Failed to create discount" });
	}
};

export const getDiscounts = async (req: Request, res: Response) => {
	try {
		const discounts = await Discount.find();
		res.status(200).json(discounts);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch discounts" });
	}
};

export const getDiscountById = async (req: Request, res: Response) => {
	try {
		const discount = await Discount.findById(req.params.id);
		if (!discount) return res.status(404).json({ error: "Discount not found" });
		res.status(200).json(discount);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch discount" });
	}
};

export const updateDiscount = async (req: Request, res: Response) => {
	try {
		const discount = await Discount.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!discount) return res.status(404).json({ error: "Discount not found" });
		res.status(200).json(discount);
	} catch (error) {
		res.status(500).json({ error: "Failed to update discount" });
	}
};

export const deleteDiscount = async (req: Request, res: Response) => {
	try {
		const discount = await Discount.findByIdAndDelete(req.params.id);
		if (!discount) return res.status(404).json({ error: "Discount not found" });
		res.status(200).json({ message: "Discount deleted" });
	} catch (error) {
		res.status(500).json({ error: "Failed to delete discount" });
	}
};

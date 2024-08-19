import { Request, Response } from "express";
import Shipping from "../models/shippingModel";

export const createShipping = async (req: Request, res: Response) => {
	try {
		const shipping = new Shipping(req.body);
		await shipping.save();
		res.status(201).json(shipping);
	} catch (error) {
		res.status(500).json({ error: "Failed to create shipping" });
	}
};

export const getShippings = async (req: Request, res: Response) => {
	try {
		const shippings = await Shipping.find().populate("user");
		res.status(200).json(shippings);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch shippings" });
	}
};

export const getShippingById = async (req: Request, res: Response) => {
	try {
		const shipping = await Shipping.findById(req.params.id).populate("user");
		if (!shipping) return res.status(404).json({ error: "Shipping not found" });
		res.status(200).json(shipping);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch shipping" });
	}
};

export const updateShipping = async (req: Request, res: Response) => {
	try {
		const shipping = await Shipping.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!shipping) return res.status(404).json({ error: "Shipping not found" });
		res.status(200).json(shipping);
	} catch (error) {
		res.status(500).json({ error: "Failed to update shipping" });
	}
};

export const deleteShipping = async (req: Request, res: Response) => {
	try {
		const shipping = await Shipping.findByIdAndDelete(req.params.id);
		if (!shipping) return res.status(404).json({ error: "Shipping not found" });
		res.status(200).json({ message: "Shipping deleted" });
	} catch (error) {
		res.status(500).json({ error: "Failed to delete shipping" });
	}
};

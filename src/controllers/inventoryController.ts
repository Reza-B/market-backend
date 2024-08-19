import { Request, Response } from "express";
import Inventory from "../models/inventoryModel";

export const createInventoryItem = async (req: Request, res: Response) => {
	try {
		const inventoryItem = new Inventory(req.body);
		await inventoryItem.save();
		res.status(201).json(inventoryItem);
	} catch (error) {
		res.status(500).json({ error: "Failed to create inventory item" });
	}
};

export const getInventoryItems = async (req: Request, res: Response) => {
	try {
		const inventoryItems = await Inventory.find().populate("product");
		res.status(200).json(inventoryItems);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch inventory items" });
	}
};

export const getInventoryItemById = async (req: Request, res: Response) => {
	try {
		const inventoryItem = await Inventory.findById(req.params.id).populate(
			"product",
		);
		if (!inventoryItem)
			return res.status(404).json({ error: "Inventory item not found" });
		res.status(200).json(inventoryItem);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch inventory item" });
	}
};

export const updateInventoryItem = async (req: Request, res: Response) => {
	try {
		const inventoryItem = await Inventory.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true },
		);
		if (!inventoryItem)
			return res.status(404).json({ error: "Inventory item not found" });
		res.status(200).json(inventoryItem);
	} catch (error) {
		res.status(500).json({ error: "Failed to update inventory item" });
	}
};

export const deleteInventoryItem = async (req: Request, res: Response) => {
	try {
		const inventoryItem = await Inventory.findByIdAndDelete(req.params.id);
		if (!inventoryItem)
			return res.status(404).json({ error: "Inventory item not found" });
		res.status(200).json({ message: "Inventory item deleted" });
	} catch (error) {
		res.status(500).json({ error: "Failed to delete inventory item" });
	}
};

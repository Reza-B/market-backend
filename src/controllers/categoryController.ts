import { Request, Response } from "express";
import Category from "../models/categoryModel";

export const createCategory = async (req: Request, res: Response) => {
	try {
		const category = new Category(req.body);
		await category.save();
		res.status(201).json(category);
	} catch (error) {
		res.status(500).json({ error: "Failed to create category" });
	}
};

export const getCategories = async (req: Request, res: Response) => {
	try {
		const categories = await Category.find();
		res.status(200).json(categories);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch categories" });
	}
};

export const getCategoryById = async (req: Request, res: Response) => {
	try {
		const category = await Category.findById(req.params.id).populate(
			"products",
		);
		if (!category) return res.status(404).json({ error: "Category not found" });
		res.status(200).json(category);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch category" });
	}
};

export const updateCategory = async (req: Request, res: Response) => {
	try {
		const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!category) return res.status(404).json({ error: "Category not found" });
		res.status(200).json(category);
	} catch (error) {
		res.status(500).json({ error: "Failed to update category" });
	}
};

export const deleteCategory = async (req: Request, res: Response) => {
	try {
		const category = await Category.findByIdAndDelete(req.params.id);
		if (!category) return res.status(404).json({ error: "Category not found" });
		res.status(200).json({ message: "Category deleted" });
	} catch (error) {
		res.status(500).json({ error: "Failed to delete category" });
	}
};

// src/controllers/categoryController.ts
import { Request, Response, NextFunction } from "express";
import Category from "../models/categoryModel";
import {
	createCategorySchema,
	updateCategorySchema,
} from "../validators/categoryValidator";

// ایجاد دسته‌بندی جدید
export const createCategory = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { error } = createCategorySchema.validate(req.body);
		if (error) {
			return res
				.status(400)
				.json({ status: "error", message: error.details[0].message });
		}

		const { name, slug, products } = req.body;

		const category = new Category({ name, slug, products });
		await category.save();

		res.status(201).json({ status: "success", data: category });
	} catch (error) {
		next(error);
	}
};

// دریافت تمام دسته‌بندی‌ها
export const getAllCategories = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const categories = await Category.find().populate("products");
		res.status(200).json({ status: "success", data: categories });
	} catch (error) {
		next(error);
	}
};

// دریافت دسته‌بندی بر اساس شناسه
export const getCategoryById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const category = await Category.findById(id).populate("products");

		if (!category) {
			return res
				.status(404)
				.json({ status: "error", message: "Category not found" });
		}

		res.status(200).json({ status: "success", data: category });
	} catch (error) {
		next(error);
	}
};

// دریافت دسته‌بندی بر اساس اسلاگ
export const getCategoryBySlug = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { slug } = req.params;
		const category = await Category.findOne({ slug }).populate("products");

		if (!category) {
			return res
				.status(404)
				.json({ status: "error", message: "Category not found" });
		}

		res.status(200).json({ status: "success", data: category });
	} catch (error) {
		next(error);
	}
};

// ویرایش دسته‌بندی
export const updateCategory = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { error } = updateCategorySchema.validate(req.body);
		if (error) {
			return res
				.status(400)
				.json({ status: "error", message: error.details[0].message });
		}

		const { id } = req.params;
		const updates = req.body;

		const updatedCategory = await Category.findByIdAndUpdate(id, updates, {
			new: true,
		});

		if (!updatedCategory) {
			return res
				.status(404)
				.json({ status: "error", message: "Category not found" });
		}

		res.status(200).json({ status: "success", data: updatedCategory });
	} catch (error) {
		next(error);
	}
};

// حذف دسته‌بندی
export const deleteCategory = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const category = await Category.findByIdAndDelete(id);

		if (!category) {
			return res
				.status(404)
				.json({ status: "error", message: "Category not found" });
		}

		res
			.status(200)
			.json({ status: "success", message: "Category deleted successfully" });
	} catch (error) {
		next(error);
	}
};

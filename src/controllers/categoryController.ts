import { Request, Response, NextFunction } from "express";
import Category from "../models/categoryModel";
import {
	createCategorySchema,
	updateCategorySchema,
} from "../validators/categoryValidator";

import multer from "multer";
import path from "path";

// تنظیم مکان و نام فایل‌های آپلود شده
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

// فیلتر کردن فایل‌ها بر اساس نوع (فقط تصاویر)
const fileFilter = (req: any, file: any, cb: any) => {
	if (file.mimetype.startsWith("image/")) {
		cb(null, true);
	} else {
		cb(new Error("Only images are allowed!"), false);
	}
};

export const upload = multer({ storage, fileFilter });

export const createCategory = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		let { name, slug, products } = req.body;
		if (products === "") {
			products = undefined;
		}
		const { error } = createCategorySchema.validate({
			name,
			slug,
			products,
		});
		if (error) {
			return res
				.status(400)
				.json({ status: "error", message: error.details[0].message });
		}

		const image = req.file ? req.file.filename : undefined;
		const category = new Category({ name, slug, products, image });
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
		let { name, slug, products } = req.body;
		if (products === "") {
			products = undefined;
		}
		const { error } = updateCategorySchema.validate({ name, slug, products });
		if (error) {
			return res
				.status(400)
				.json({ status: "error", message: error.details[0].message });
		}

		const { id } = req.params;
		const image = req.file ? req.file.filename : undefined;

		// به‌روزرسانی دسته‌بندی
		const updatedCategory = await Category.findByIdAndUpdate(
			id,
			{ name, slug, products, image },
			{
				new: true,
			},
		);

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

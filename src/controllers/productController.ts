// src/controllers/productController.ts
import { Request, Response, NextFunction } from "express";
import Product from "../models/productModel";
import { productSchema } from "../validators/productValidator";

import { uploadImage } from "../services/uploadImage";

const upload = uploadImage({ dest: "products" });
const uploadMainImage = upload.single("mainImage");
const uploadImages = upload.array("images", 5);

// دریافت یک محصول بر اساس شناسه
export const getProductById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id)
			.populate("category")
			.populate("variants");

		if (!product) {
			return res
				.status(404)
				.json({ status: "error", message: "Product not found" });
		}

		res.status(200).json({ status: "success", data: product });
	} catch (error) {
		next(error);
	}
};

// دریافت 12 تا از جدیدترین محصولات
export const getLatestProducts = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const products = await Product.find()
			.sort({ createdAt: -1 })
			.limit(12)
			.select(
				"name mainImage basePrice discountedPrice discountPercentage isOnSale slug",
			);

		res.status(200).json({ status: "success", data: products });
	} catch (error) {
		next(error);
	}
};

// دریافت 12 عدد از محصولات دارای بیشترین تخفیف
export const getTopDiscountedProducts = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const products = await Product.find({ isOnSale: true })
			.sort({ discountPercentage: -1 })
			.limit(12)
			.select(
				"name mainImage basePrice discountedPrice discountPercentage isOnSale slug",
			);

		res.status(200).json({ status: "success", data: products });
	} catch (error) {
		next(error);
	}
};

// دریافت 12 محصول دارای تخفیف به صورت رندوم
export const getRandomDiscountedProducts = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const products = await Product.aggregate([
			{ $match: { isOnSale: true } },
			{ $sample: { size: 12 } },
			{
				$project: {
					name: 1,
					mainImage: 1,
					basePrice: 1,
					discountedPrice: 1,
					discountPercentage: 1,
					isOnSale: 1,
					slug: 1,
				},
			},
		]);

		res.status(200).json({ status: "success", data: products });
	} catch (error) {
		next(error);
	}
};

// دریافت تمام محصولات با نام، id، قیمت، تصویر اصلی، slug و وضعیت موجودی
export const getAllProductSummary = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const products = await Product.find()
			.select("name _id basePrice mainImage slug")
			.populate("inventory", "quantity"); // Assuming you have an Inventory model and it's referenced in Product

		res.status(200).json({ status: "success", data: products });
	} catch (error) {
		next(error);
	}
};

// دریافت تمام محصولات
export const getAllProducts = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const products = await Product.find()
			.populate("category")
			.populate("variants");

		res.status(200).json({ status: "success", data: products });
	} catch (error) {
		next(error);
	}
};

// ساخت محصول جدید
export const createProduct = [
	uploadMainImage, // برای آپلود تصویر اصلی
	uploadImages, // برای آپلود تصاویر اضافی
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			// اعتبارسنجی داده‌های ورودی
			const { error } = productSchema.validate(req.body);
			if (error) {
				return res
					.status(400)
					.json({ status: "error", message: error.details[0].message });
			}

			const productData = req.body;

			// ذخیره مسیر عکس اصلی در محصول
			if (req.file) {
				productData.mainImage = req.file.filename;
			}

			// ذخیره مسیر تصاویر اضافی در محصول
			if (req.files) {
				productData.images = (req.files as Express.Multer.File[]).map(
					(file) => file.filename,
				);
			}

			const product = new Product(productData);

			// محاسبه قیمت تخفیف‌خورده
			if (product.isOnSale) {
				product.discountedPrice =
					product.basePrice -
					(product.basePrice * product.discountPercentage) / 100;
			} else {
				product.discountedPrice = product.basePrice;
			}

			await product.save();
			res.status(201).json({ status: "success", data: product });
		} catch (error) {
			next(error);
		}
	},
];

// ویرایش محصول
export const updateProduct = [
	uploadMainImage,
	uploadImages,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const updates = req.body;

			// اعتبارسنجی داده‌های ورودی
			const { error } = productSchema.validate(updates);
			if (error) {
				return res
					.status(400)
					.json({ status: "error", message: error.details[0].message });
			}

			// به‌روزرسانی مسیر عکس اصلی در صورت آپلود شدن
			if (req.file) {
				updates.mainImage = req.file.filename;
			}

			// به‌روزرسانی مسیر تصاویر اضافی در صورت آپلود شدن
			if (req.files) {
				updates.images = (req.files as Express.Multer.File[]).map(
					(file) => file.filename,
				);
			}

			// محاسبه قیمت تخفیف‌خورده بر اساس داده‌های ورودی
			if (
				updates.basePrice !== undefined ||
				updates.discountPercentage !== undefined ||
				updates.isOnSale !== undefined
			) {
				if (updates.isOnSale) {
					updates.discountedPrice =
						updates.basePrice -
						(updates.basePrice * updates.discountPercentage) / 100;
				} else {
					updates.discountedPrice = updates.basePrice;
				}
			}

			const product = await Product.findByIdAndUpdate(id, updates, {
				new: true,
			});

			if (!product) {
				return res
					.status(404)
					.json({ status: "error", message: "Product not found" });
			}

			res.status(200).json({ status: "success", data: product });
		} catch (error) {
			next(error);
		}
	},
];

// حذف محصول
export const deleteProduct = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndDelete(id);

		if (!product) {
			return res
				.status(404)
				.json({ status: "error", message: "Product not found" });
		}

		res
			.status(204)
			.json({ status: "success", message: "Product deleted successfully" });
	} catch (error) {
		next(error);
	}
};

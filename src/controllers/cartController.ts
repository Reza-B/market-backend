// src/controllers/cartController.ts
import { Request, Response, NextFunction } from "express";
import Cart from "../models/cartModel";
import Product from "../models/productModel";
import { IUser } from "../types";

// ایجاد یا بروزرسانی سبد خرید
export const addToCart = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userId = req.user?._id;
		const { productId, quantity } = req.body;

		// بررسی وجود محصول
		const product = await Product.findById(productId);
		if (!product) {
			return res
				.status(404)
				.json({ status: "error", message: "Product not found" });
		}

		// بررسی وجود سبد خرید برای کاربر
		let cart = await Cart.findOne({ user: userId });

		if (cart) {
			// بروزرسانی تعداد محصول اگر محصول در سبد خرید موجود است
			const itemIndex = cart.items.findIndex(
				(item) => item.product.toString() === productId,
			);

			if (itemIndex > -1) {
				cart.items[itemIndex].quantity += quantity;
			} else {
				cart.items.push({ product: productId, quantity });
			}
		} else {
			// ایجاد سبد خرید جدید
			cart = new Cart({
				user: userId,
				items: [{ product: productId, quantity }],
				totalPrice: product.discountedPrice * quantity,
			});
		}

		// بروزرسانی قیمت کل
		cart.totalPrice = cart.items.reduce(
			(acc, item) => acc + item.quantity * product.discountedPrice,
			0,
		);

		await cart.save();

		res.status(200).json({ status: "success", cart });
	} catch (error) {
		next(error);
	}
};

// دریافت سبد خرید کاربر
export const getCart = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userId = req.user?._id; // فرض بر اینکه از JWT استفاده می‌کنید و user.id در JWT ذخیره شده

		const cart = await Cart.findOne({ user: userId }).populate("items.product");

		if (!cart) {
			return res
				.status(404)
				.json({ status: "error", message: "Cart not found" });
		}

		res.status(200).json({ status: "success", cart });
	} catch (error) {
		next(error);
	}
};

// حذف یک محصول از سبد خرید
export const removeFromCart = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userId = req.user?._id;
		const { productId } = req.params;

		const cart = await Cart.findOne({ user: userId });
		if (!cart) {
			return res
				.status(404)
				.json({ status: "error", message: "Cart not found" });
		}

		const itemIndex = cart.items.findIndex(
			(item) => item.product.toString() === productId,
		);

		if (itemIndex > -1) {
			cart.items.splice(itemIndex, 1);

			// بروزرسانی قیمت کل
			cart.totalPrice = cart.items.reduce(
				(acc, item) => acc + item.quantity * item.product.discountedPrice,
				0,
			);

			await cart.save();
			return res.status(200).json({ status: "success", cart });
		} else {
			return res
				.status(404)
				.json({ status: "error", message: "Product not found in cart" });
		}
	} catch (error) {
		next(error);
	}
};

// حذف کامل سبد خرید
export const clearCart = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userId = req.user?._id;

		const cart = await Cart.findOneAndDelete({ user: userId });

		if (!cart) {
			return res
				.status(404)
				.json({ status: "error", message: "Cart not found" });
		}

		res.status(200).json({ status: "success", message: "Cart cleared" });
	} catch (error) {
		next(error);
	}
};

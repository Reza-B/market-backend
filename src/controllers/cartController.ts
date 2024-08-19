import { Request, Response } from "express";
import Cart from "../models/cartModel";

// افزودن محصول به سبد خرید
export const addToCart = async (req: Request, res: Response) => {
	try {
		const { userId, productId, quantity } = req.body;

		// بررسی وجود محصول در سبد خرید کاربر
		let cart = await Cart.findOne({ user: userId });
		if (cart) {
			// بررسی وجود محصول در سبد خرید
			const itemIndex = cart.items.findIndex(
				(item) => item.product.toString() === productId,
			);
			if (itemIndex > -1) {
				// اگر محصول در سبد خرید وجود دارد، فقط تعداد را به‌روزرسانی کن
				cart.items[itemIndex].quantity += quantity;
			} else {
				// اگر محصول در سبد خرید وجود ندارد، آن را اضافه کن
				cart.items.push({ product: productId, quantity });
			}
		} else {
			// اگر سبد خرید وجود ندارد، یک سبد خرید جدید برای کاربر ایجاد کن
			cart = new Cart({
				user: userId,
				items: [{ product: productId, quantity }],
			});
		}

		await cart.save();
		res.status(200).json(cart);
	} catch (error) {
		res.status(500).json({ error: "Failed to add item to cart" });
	}
};

// دریافت سبد خرید کاربر
export const getCart = async (req: Request, res: Response) => {
	try {
		const cart = await Cart.findOne({ user: req.params.userId }).populate(
			"items.product",
		);
		if (!cart) return res.status(404).json({ error: "Cart not found" });
		res.status(200).json(cart);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch cart" });
	}
};

// حذف محصول از سبد خرید
export const removeFromCart = async (req: Request, res: Response) => {
	try {
		const { userId, productId } = req.body;

		const cart = await Cart.findOne({ user: userId });
		if (!cart) return res.status(404).json({ error: "Cart not found" });

		const itemIndex = cart.items.findIndex(
			(item) => item.product.toString() === productId,
		);
		if (itemIndex > -1) {
			cart.items.splice(itemIndex, 1);
			await cart.save();
			res.status(200).json(cart);
		} else {
			res.status(404).json({ error: "Product not found in cart" });
		}
	} catch (error) {
		res.status(500).json({ error: "Failed to remove item from cart" });
	}
};

// حذف سبد خرید کاربر
export const clearCart = async (req: Request, res: Response) => {
	try {
		const cart = await Cart.findOneAndDelete({ user: req.params.userId });
		if (!cart) return res.status(404).json({ error: "Cart not found" });
		res.status(200).json({ message: "Cart cleared" });
	} catch (error) {
		res.status(500).json({ error: "Failed to clear cart" });
	}
};

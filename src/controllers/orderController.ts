// src/controllers/orderController.ts
import { Request, Response, NextFunction } from "express";
import Order from "../models/orderModel";
import {
	createOrderSchema,
	updateOrderSchema,
} from "../validators/orderValidator";

// ایجاد یک سفارش جدید
export const createOrder = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { error } = createOrderSchema.validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ status: "error", message: error.details[0].message });

		const order = new Order(req.body);
		await order.save();

		res.status(201).json({ status: "success", data: order });
	} catch (error) {
		next(error);
	}
};

// دریافت تمام سفارشات
export const getAllOrders = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const orders = await Order.find().populate(
			"user cart payment shipping products.product",
		);
		res.status(200).json({ status: "success", data: orders });
	} catch (error) {
		next(error);
	}
};

// دریافت سفارش با شناسه خاص
export const getOrderById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const order = await Order.findById(id).populate(
			"user cart payment shipping products.product",
		);

		if (!order) {
			return res
				.status(404)
				.json({ status: "error", message: "Order not found" });
		}

		res.status(200).json({ status: "success", data: order });
	} catch (error) {
		next(error);
	}
};

// به‌روزرسانی سفارش
export const updateOrder = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const { error } = updateOrderSchema.validate(req.body);
		if (error)
			return res
				.status(400)
				.json({ status: "error", message: error.details[0].message });

		const order = await Order.findByIdAndUpdate(id, req.body, { new: true });

		if (!order) {
			return res
				.status(404)
				.json({ status: "error", message: "Order not found" });
		}

		res.status(200).json({ status: "success", data: order });
	} catch (error) {
		next(error);
	}
};

// حذف سفارش
export const deleteOrder = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const order = await Order.findByIdAndDelete(id);

		if (!order) {
			return res
				.status(404)
				.json({ status: "error", message: "Order not found" });
		}

		res
			.status(200)
			.json({ status: "success", message: "Order deleted successfully" });
	} catch (error) {
		next(error);
	}
};

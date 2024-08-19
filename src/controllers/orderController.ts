import { Request, Response } from "express";
import Order from "../models/orderModel";

export const createOrder = async (req: Request, res: Response) => {
	try {
		const order = new Order(req.body);
		await order.save();
		res.status(201).json(order);
	} catch (error) {
		res.status(500).json({ error: "Failed to create order" });
	}
};

export const getOrders = async (req: Request, res: Response) => {
	try {
		const orders = await Order.find().populate(
			"user products.product shipping",
		);
		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch orders" });
	}
};

export const getOrderById = async (req: Request, res: Response) => {
	try {
		const order = await Order.findById(req.params.id).populate(
			"user products.product shipping",
		);
		if (!order) return res.status(404).json({ error: "Order not found" });
		res.status(200).json(order);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch order" });
	}
};

export const updateOrder = async (req: Request, res: Response) => {
	try {
		const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!order) return res.status(404).json({ error: "Order not found" });
		res.status(200).json(order);
	} catch (error) {
		res.status(500).json({ error: "Failed to update order" });
	}
};

export const deleteOrder = async (req: Request, res: Response) => {
	try {
		const order = await Order.findByIdAndDelete(req.params.id);
		if (!order) return res.status(404).json({ error: "Order not found" });
		res.status(200).json({ message: "Order deleted" });
	} catch (error) {
		res.status(500).json({ error: "Failed to delete order" });
	}
};

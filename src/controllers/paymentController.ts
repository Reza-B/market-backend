import { Request, Response } from "express";
import Payment from "../models/paymentModel";

export const createPayment = async (req: Request, res: Response) => {
	try {
		const payment = new Payment(req.body);
		await payment.save();
		res.status(201).json(payment);
	} catch (error) {
		res.status(500).json({ error: "Failed to create payment" });
	}
};

export const getPayments = async (req: Request, res: Response) => {
	try {
		const payments = await Payment.find().populate("order");
		res.status(200).json(payments);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch payments" });
	}
};

export const getPaymentById = async (req: Request, res: Response) => {
	try {
		const payment = await Payment.findById(req.params.id).populate("order");
		if (!payment) return res.status(404).json({ error: "Payment not found" });
		res.status(200).json(payment);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch payment" });
	}
};

export const updatePayment = async (req: Request, res: Response) => {
	try {
		const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!payment) return res.status(404).json({ error: "Payment not found" });
		res.status(200).json(payment);
	} catch (error) {
		res.status(500).json({ error: "Failed to update payment" });
	}
};

export const deletePayment = async (req: Request, res: Response) => {
	try {
		const payment = await Payment.findByIdAndDelete(req.params.id);
		if (!payment) return res.status(404).json({ error: "Payment not found" });
		res.status(200).json({ message: "Payment deleted" });
	} catch (error) {
		res.status(500).json({ error: "Failed to delete payment" });
	}
};

import mongoose, { Schema } from "mongoose";

import { IOrder } from "./interfaces/IOrder";

const OrderSchema: Schema = new Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true },
	payment: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Payment",
		required: true,
	},
	shipping: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Shipping",
		required: true,
	},
	status: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	totalAmount: { type: Number, required: true },
	products: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
				required: true,
			},
			quantity: { type: Number, required: true },
		},
	],
});

export default mongoose.model<IOrder>("Order", OrderSchema);

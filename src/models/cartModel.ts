import mongoose, { Schema } from "mongoose";

import { ICart } from "./interfaces/ICart";

const CartSchema: Schema = new Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	items: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
				required: true,
			},
			quantity: { type: Number, required: true },
		},
	],
	totalPrice: { type: Number, required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<ICart>("Cart", CartSchema);

// src/models/BasketItem.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IBasketItem extends Document {
	item: {
		imgUrl: string;
		name: string;
		title: string;
		category: string;
		description: string;
		price: number;
		color: string;
		colors: string[];
		userId: number;
		id: number;
	};
	id: string;
	color: string;
}

const BasketItemSchema: Schema = new Schema({
	item: {
		imgUrl: { type: String, required: true },
		name: { type: String, required: true },
		title: { type: String, required: true },
		category: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		color: { type: String, required: true },
		colors: [{ type: String, required: true }],
		userId: { type: Number, required: true },
		id: { type: Number, required: true },
	},
	id: { type: String, required: true },
	color: { type: String, required: true },
});

export default mongoose.model<IBasketItem>("BasketItem", BasketItemSchema);

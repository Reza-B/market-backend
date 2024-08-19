// src/models/ProductItem.ts
import mongoose, { Schema, Document } from "mongoose";
import { IColor } from "./Color";

export interface IProductItem extends Document {
	imgUrl: string;
	name: string;
	title: string;
	category: number;
	price: number;
	discount: number;
	finalPrice: number;
	suggestion: boolean;
	color: IColor;
	colors: IColor[];
	created: Date;
}

const ProductItemSchema: Schema = new Schema({
	imgUrl: { type: String, required: true },
	name: { type: String, required: true },
	title: { type: String, required: true },
	category: { type: Number, required: true },
	price: { type: Number, required: true },
	discount: { type: Number, required: true },
	finalPrice: { type: Number, required: true },
	suggestion: { type: Boolean, default: false },
	color: { type: Schema.Types.ObjectId, ref: "Color", required: true },
	colors: [{ type: Schema.Types.ObjectId, ref: "Color", required: true }],
	created: { type: Date, default: Date.now },
});

export default mongoose.model<IProductItem>("ProductItem", ProductItemSchema);

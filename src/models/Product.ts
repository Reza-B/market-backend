// src/models/Product.ts
import mongoose, { Schema, Document } from "mongoose";
import { ICategory } from "./Category";
import { IColor } from "./Color";

export interface IProduct extends Document {
	imgUrl: string[];
	name: string;
	title: string;
	category: ICategory;
	description: string;
	price: number;
	color: string;
	colors: IColor[];
	created: Date;
}

const ProductSchema: Schema = new Schema({
	imgUrl: [{ type: String, required: true }],
	name: { type: String, required: true },
	title: { type: String, required: true },
	category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	color: { type: String, required: true },
	colors: [{ type: Schema.Types.ObjectId, ref: "Color", required: true }],
	created: { type: Date, default: Date.now },
});

export default mongoose.model<IProduct>("Product", ProductSchema);

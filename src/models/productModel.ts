import mongoose, { Schema } from "mongoose";
import { IProduct } from "./interfaces/IProduct";

const ProductSchema: Schema = new Schema({
	name: { type: String, required: true },
	mainImage: { type: String, required: true },
	images: { type: [String], required: true },
	rating: { type: Number, default: 0 },
	ratingCount: { type: Number, default: 0 },
	keyFeatures: { type: [String], required: true },
	sizes: { type: [String], default: [] },
	description: { type: String, required: true },
	reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
	price: { type: Number, required: true },
	createdAt: { type: Date, default: Date.now },
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
		required: true,
	},
});

export default mongoose.model<IProduct>("Product", ProductSchema);

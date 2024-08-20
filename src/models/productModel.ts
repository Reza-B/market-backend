import mongoose, { Schema } from "mongoose";
import { IProduct } from "./interfaces/IProduct";

const VariantSchema = new Schema({
	name: { type: String, required: true },
	additionalPrice: { type: Number, required: true },
});

const ProductSchema: Schema = new Schema({
	name: { type: String, required: true },
	mainImage: { type: String, required: true },
	images: { type: [String], required: true },
	rating: { type: Number, default: 0 },
	ratingCount: { type: Number, default: 0 },
	keyFeatures: { type: [String], required: true },
	sizes: { type: [String], default: [] },
	description: { type: String, required: true },
	isOnSale: { type: Boolean, default: false },
	discountPercentage: { type: Number, default: 0 },
	basePrice: { type: Number, required: true },
	discountedPrice: { type: Number, required: true },
	variants: [VariantSchema],
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
		required: true,
	},
	createdAt: { type: Date, default: Date.now },
});

ProductSchema.pre<IProduct>("save", function (next) {
	if (this.isOnSale) {
		this.discountedPrice =
			this.basePrice - (this.basePrice * this.discountPercentage) / 100;
	} else {
		this.discountedPrice = this.basePrice;
	}
	next();
});

export default mongoose.model<IProduct>("Product", ProductSchema);

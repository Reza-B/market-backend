import mongoose, { Schema } from "mongoose";
import { IReview } from "./interfaces/IReview"; // مسیر صحیح به اینترفیس

const ReviewSchema: Schema = new Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
	rating: { type: Number, required: true, min: 1, max: 5 },
	comment: { type: String },
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IReview>("Review", ReviewSchema);

import mongoose, { Schema } from "mongoose";

import { IDiscount } from "./interfaces/IDiscount";

const DiscountSchema: Schema = new Schema({
	code: { type: String, required: true, unique: true },
	percentage: { type: Number, required: true },
	validFrom: { type: Date, required: true },
	validUntil: { type: Date, required: true },
	usageLimit: { type: Number, required: true },
	usedCount: { type: Number, default: 0 },
	isActive: { type: Boolean, default: true },
});

export default mongoose.model<IDiscount>("Discount", DiscountSchema);

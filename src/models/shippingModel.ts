import mongoose, { Schema } from "mongoose";
import { IShipping } from "./interfaces/IShipping";

const ShippingSchema: Schema = new Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	address: { type: String, required: true },
	city: { type: String, required: true },
	postalCode: { type: String, required: true },
	shippingMethod: { type: String, required: true },
});

export default mongoose.model<IShipping>("Shipping", ShippingSchema);

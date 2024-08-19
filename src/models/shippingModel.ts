import mongoose, { Schema } from "mongoose";
import { IShipping } from "./interfaces/IShipping"; // مسیر صحیح به اینترفیس

const ShippingSchema: Schema = new Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // شناسه کاربر
	address: { type: String, required: true }, // آدرس ارسال
	city: { type: String, required: true }, // شهر
	postalCode: { type: String, required: true }, // کد پستی
	country: { type: String, required: true }, // کشور
	shippingMethod: { type: String, required: true }, // روش ارسال
});

export default mongoose.model<IShipping>("Shipping", ShippingSchema);

import mongoose, { Schema } from "mongoose";

import { IPayment } from "./interfaces/IPayment";

const PaymentSchema: Schema = new Schema({
	order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
	amount: { type: Number, required: true },
	method: { type: String, required: true },
	status: { type: String, required: true },
	paymentDate: { type: Date, default: Date.now },
});

export default mongoose.model<IPayment>("Payment", PaymentSchema);

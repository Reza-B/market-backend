// src/models/User.ts
import mongoose, { Schema, Document } from "mongoose";
import { IBasketItem } from "./BasketItem";

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	phone: string;
	address: string;
	email: string;
	basket: IBasketItem[];
	favorite: number[];
	totalPrice: number;
}

const UserSchema: Schema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	phone: { type: String, required: true },
	address: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	basket: [{ type: Schema.Types.ObjectId, ref: "BasketItem" }],
	favorite: [{ type: Number }],
	totalPrice: { type: Number, required: true },
});

export default mongoose.model<IUser>("User", UserSchema);

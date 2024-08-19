// src/models/User.ts
import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	phone: string;
	address: string;
	email: string;
	password: string;
	basket: string[];
	favorite: number[];
	totalPrice: number;
	matchPassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	phone: { type: String, required: true },
	address: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	basket: [{ type: Schema.Types.ObjectId, ref: "BasketItem" }],
	favorite: [{ type: Number }],
	totalPrice: { type: Number, required: true },
});

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(String(this.password), salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
	return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);

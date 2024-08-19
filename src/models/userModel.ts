import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

import { IUser } from "./interfaces/IUser";

const UserSchema: Schema = new Schema({
	phone: { type: String, required: true, unique: true },
	email: { type: String, unique: true },
	password: { type: String },
	firstName: { type: String },
	lastName: { type: String },
	profilePicture: { type: String },
	gender: { type: String },
	verificationCode: { type: String }, // For phone verification
	isPhoneVerified: { type: Boolean, default: false }, // Indicates if phone is verified
	createdAt: { type: Date, default: Date.now }, // تاریخ ثبت نام
});

// Hash the user's password before saving
UserSchema.pre<IUser>("save", async function (next) {
	if (!this.isModified("password")) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password || "", salt);
		next();
	} catch (error: any) {
		next(error);
	}
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (
	candidatePassword: string,
): Promise<boolean> {
	return await bcrypt.compare(candidatePassword, this.password || "");
};

export default mongoose.model<IUser>("User", UserSchema);

// src/models/Admin.ts
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IAdmin } from "./interfaces/IAdmin";

// تعریف اسکیما برای ادمین
const AdminSchema: Schema = new Schema({
	phone: { type: String, required: true, unique: true },
	email: { type: String, unique: true },
	password: { type: String },
	firstName: { type: String },
	lastName: { type: String },
	profilePicture: { type: String },
	gender: { type: String },
	verificationCode: { type: String },
	isPhoneVerified: { type: Boolean, default: false },
	role: { type: String, default: "admin" }, // نقش پیش‌فرض 'admin'
	createdAt: { type: Date, default: Date.now },
});

// هش کردن رمز عبور قبل از ذخیره‌سازی
AdminSchema.pre<IAdmin>("save", async function (next) {
	if (!this.isModified("password")) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password || "", salt);
		next();
	} catch (error: any) {
		next(error);
	}
});

// متد مقایسه رمز عبور
AdminSchema.methods.comparePassword = async function (
	candidatePassword: string,
): Promise<boolean> {
	return await bcrypt.compare(candidatePassword, this.password || "");
};

export default mongoose.model<IAdmin>("Admin", AdminSchema);

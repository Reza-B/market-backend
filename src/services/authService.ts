import jwt from "jsonwebtoken"; // پکیج JWT برای تولید و تأیید توکن
import { IUser } from "../models/interfaces/IUser"; // مسیر مدل کاربر

// تابع تولید توکن
export function generateToken(user: IUser): string {
	const payload = {
		userId: user._id,
		phone: user.phone,
	};

	return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" }); // توکن به مدت یک ساعت معتبر است
}

// تابع تأیید توکن
export function verifyToken(token: string): any {
	try {
		return jwt.verify(token, process.env.JWT_SECRET!);
	} catch (error) {
		console.error("Error verifying token:", error);
		throw new Error("Invalid token");
	}
}

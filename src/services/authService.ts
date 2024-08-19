import jwt from "jsonwebtoken"; // پکیج JWT برای تولید و تأیید توکن
import { IUser } from "../models/interfaces/IUser"; // مسیر مدل کاربر

const JWT_SECRET = process.env.JWT_SECRET; // کلید محرمانه برای JWT

// تابع تولید توکن
export function generateToken(user: IUser): string {
	const payload = {
		userId: user._id,
		username: user.phone,
	};

	return jwt.sign(payload, JWT_SECRET!, { expiresIn: "1h" }); // توکن به مدت یک ساعت معتبر است
}

// تابع تأیید توکن
export function verifyToken(token: string): any {
	try {
		return jwt.verify(token, JWT_SECRET!);
	} catch (error) {
		console.error("Error verifying token:", error);
		throw new Error("Invalid token");
	}
}

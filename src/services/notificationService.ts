import crypto from "crypto"; // برای تولید کد تأیید
import User from "../models/userModel"; // مسیر مدل کاربر

// تابع تولید کد تأیید
function generateVerificationCode(): string {
	return crypto.randomInt(100000, 999999).toString(); // تولید کد 6 رقمی تصادفی
}

// تابع ارسال کد تأیید
export async function sendVerificationCode(phone: string): Promise<void> {
	try {
		const verificationCode = generateVerificationCode();

		// ذخیره کد تأیید در پایگاه داده
		const user = await User.findOneAndUpdate(
			{ phone },
			{ verificationCode },
			{ new: true, upsert: true }, // ایجاد کاربر جدید اگر وجود نداشته باشد
		);

		console.log(`Verification code ${verificationCode} sent to ${phone}`);
	} catch (error) {
		console.error("Error sending verification code:", error);
		throw new Error("Failed to send verification code");
	}
}

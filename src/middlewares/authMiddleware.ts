import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { IUser } from "../types/index";

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token)
			return res
				.status(401)
				.json({ success: false, error: "No token provided" });

		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET || "your_jwt_secret",
		);

		// بررسی نوع decoded و تبدیل به IUser
		if (
			typeof decoded === "object" &&
			decoded !== null &&
			"userId" in decoded
		) {
			const user = await User.findById(decoded.userId);
			if (!user)
				return res
					.status(401)
					.json({ success: false, error: "User not found" });

			req.user = user; // تنظیم req.user با تایپ IUser
		} else {
			return res
				.status(401)
				.json({ success: false, error: "Invalid token payload" });
		}

		next();
	} catch (error) {
		res.status(401).json({ success: false, error: "Invalid token" });
	}
};

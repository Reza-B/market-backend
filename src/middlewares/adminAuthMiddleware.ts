// src/middlewares/adminAuthMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/adminModel";

export const adminAuthMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		// Step 1: Check for token
		const token = req.headers.authorization?.split(" ")[1];
		if (!token) {
			return res
				.status(401)
				.json({ success: false, message: "No token provided" });
		}

		// Step 2: Verify token
		const decoded = jwt.verify(
			token,
			process.env.ADMIN_JWT_SECRET || "your_ADMIN_JWT_SECRET",
		);

		// Check the structure of decoded token
		if (
			typeof decoded === "object" &&
			decoded !== null &&
			"adminId" in decoded
		) {
			const admin = await Admin.findById(decoded.adminId);
			if (!admin) {
				return res
					.status(401)
					.json({ success: false, message: "Admin not found" });
			}

			req.admin = admin;

			next();
		} else {
			return res
				.status(401)
				.json({ success: false, message: "Invalid token payload" });
		}
	} catch (error) {
		res.status(401).json({ success: false, message: "Invalid token" });
	}
};

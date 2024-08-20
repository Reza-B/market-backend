import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import Admin from "../models/adminModel";

// Create a new admin
export const createAdmin = async (req: Request, res: Response) => {
	try {
		const { phone, email, password, firstName, lastName } = req.body;

		const admin = new Admin({ phone, email, password, firstName, lastName });
		await admin.save();

		res.status(201).json({
			success: true,
			message: "Admin created successfully",
			admin,
		});
	} catch (error: any) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get all admins
export const getAllAdmins = async (req: Request, res: Response) => {
	try {
		const admins = await Admin.find();
		res.status(200).json({
			success: true,
			admins,
		});
	} catch (error: any) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Get an admin by ID
export const getAdminById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const admin = await Admin.findById(id);

		if (!admin) {
			return res
				.status(404)
				.json({ success: false, message: "Admin not found" });
		}

		res.status(200).json({
			success: true,
			admin,
		});
	} catch (error: any) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Update an admin
export const updateAdmin = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const updateData = req.body;

		if (updateData.password) {
			// Hash the new password before saving
			const salt = await bcrypt.genSalt(10);
			updateData.password = await bcrypt.hash(updateData.password, salt);
		}

		const admin = await Admin.findByIdAndUpdate(id, updateData, { new: true });

		if (!admin) {
			return res
				.status(404)
				.json({ success: false, message: "Admin not found" });
		}

		res.status(200).json({
			success: true,
			message: "Admin updated successfully",
			admin,
		});
	} catch (error: any) {
		res.status(500).json({ success: false, message: error.message });
	}
};

// Delete an admin
export const deleteAdmin = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const admin = await Admin.findByIdAndDelete(id);

		if (!admin) {
			return res
				.status(404)
				.json({ success: false, message: "Admin not found" });
		}

		res.status(200).json({
			success: true,
			message: "Admin deleted successfully",
		});
	} catch (error: any) {
		res.status(500).json({ success: false, message: error.message });
	}
};

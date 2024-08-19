// src/controllers/authController.ts
import { Request, Response } from "express";
import User from "../models/User";
import generateToken from "../utils/generateToken";

export const registerUser = async (req: Request, res: Response) => {
	const { firstName, lastName, phone, address, email, password } = req.body;

	try {
		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(400).json({ message: "User already exists" });
		}

		const user = await User.create({
			firstName,
			lastName,
			phone,
			address,
			email,
			password,
			basket: [],
			favorite: [],
			totalPrice: 0,
		});

		if (user) {
			res.status(201).json({
				_id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				token: generateToken(String(user._id)),
			});
		} else {
			res.status(400).json({ message: "Invalid user data" });
		}
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

export const authUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (user && (await user.matchPassword(password))) {
			res.json({
				_id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				token: generateToken(String(user._id)),
			});
		} else {
			res.status(401).json({ message: "Invalid email or password" });
		}
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

// src/controllers/userController.ts
import { Request, Response } from "express";
import User from "../models/User";

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find().populate("basket");
		res.json(users);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

export const getUserById = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.params.id).populate("basket");
		if (!user) return res.status(404).json({ message: "User not found" });
		res.json(user);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

export const createUser = async (req: Request, res: Response) => {
	const {
		firstName,
		lastName,
		phone,
		address,
		email,
		basket,
		favorite,
		totalPrice,
	} = req.body;

	const newUser = new User({
		firstName,
		lastName,
		phone,
		address,
		email,
		basket,
		favorite,
		totalPrice,
	});

	try {
		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

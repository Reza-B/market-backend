// src/controllers/productController.ts
import { Request, Response } from "express";
import Product from "../models/Product";

export const getProducts = async (req: Request, res: Response) => {
	try {
		const products = await Product.find()
			.populate("category")
			.populate("colors");
		res.json(products);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

export const getProductById = async (req: Request, res: Response) => {
	try {
		const product = await Product.findById(req.params.id)
			.populate("category")
			.populate("colors");
		if (!product) return res.status(404).json({ message: "Product not found" });
		res.json(product);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

export const createProduct = async (req: Request, res: Response) => {
	const { imgUrl, name, title, category, description, price, color, colors } =
		req.body;

	const newProduct = new Product({
		imgUrl,
		name,
		title,
		category,
		description,
		price,
		color,
		colors,
		created: new Date(),
	});

	try {
		const savedProduct = await newProduct.save();
		res.status(201).json(savedProduct);
	} catch (err: any) {
		res.status(500).json({ message: err.message });
	}
};

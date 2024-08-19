// // src/controllers/productController.ts
// import { Request, Response } from "express";
// import Product from "../models/Product";

// export const getProducts = async (req: Request, res: Response) => {
// 	try {
// 		const products = await Product.find()
// 			.populate("category")
// 			.populate("colors");
// 		res.json(products);
// 	} catch (err: any) {
// 		res.status(500).json({ message: err.message });
// 	}
// };

// export const getProductById = async (req: Request, res: Response) => {
// 	try {
// 		const product = await Product.findById(req.params.id)
// 			.populate("category")
// 			.populate("colors");
// 		if (!product) return res.status(404).json({ message: "Product not found" });
// 		res.json(product);
// 	} catch (err: any) {
// 		res.status(500).json({ message: err.message });
// 	}
// };

// export const createProduct = async (req: Request, res: Response) => {
// 	const { imgUrl, name, title, category, description, price, color, colors } =
// 		req.body;

// 	const newProduct = new Product({
// 		imgUrl,
// 		name,
// 		title,
// 		category,
// 		description,
// 		price,
// 		color,
// 		colors,
// 		created: new Date(),
// 	});

// 	try {
// 		const savedProduct = await newProduct.save();
// 		res.status(201).json(savedProduct);
// 	} catch (err: any) {
// 		res.status(500).json({ message: err.message });
// 	}
// };

import { Request, Response } from "express";
import Product from "../models/productModel";

export const createProduct = async (req: Request, res: Response) => {
	try {
		const product = new Product(req.body);
		await product.save();
		res.status(201).json(product);
	} catch (error) {
		res.status(500).json({ error: "Failed to create product" });
	}
};

export const getProducts = async (req: Request, res: Response) => {
	try {
		const products = await Product.find().populate("category reviews");
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch products" });
	}
};

export const getProductById = async (req: Request, res: Response) => {
	try {
		const product = await Product.findById(req.params.id).populate(
			"category reviews",
		);
		if (!product) return res.status(404).json({ error: "Product not found" });
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch product" });
	}
};

export const updateProduct = async (req: Request, res: Response) => {
	try {
		const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!product) return res.status(404).json({ error: "Product not found" });
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({ error: "Failed to update product" });
	}
};

export const deleteProduct = async (req: Request, res: Response) => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id);
		if (!product) return res.status(404).json({ error: "Product not found" });
		res.status(200).json({ message: "Product deleted" });
	} catch (error) {
		res.status(500).json({ error: "Failed to delete product" });
	}
};

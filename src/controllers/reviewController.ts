import { Request, Response } from "express";
import Review from "../models/reviewModel";
import Product from "../models/productModel";

export const createReview = async (req: Request, res: Response) => {
	try {
		const review = new Review(req.body);
		await review.save();

		// Update product rating and review count
		const product = await Product.findById(req.body.product);
		if (product) {
			product.ratingCount += 1;
			product.rating =
				(product.rating * (product.ratingCount - 1) + review.rating) /
				product.ratingCount;
			await product.save();
		}

		res.status(201).json(review);
	} catch (error) {
		res.status(500).json({ error: "Failed to create review" });
	}
};

export const getReviews = async (req: Request, res: Response) => {
	try {
		const reviews = await Review.find().populate("user product");
		res.status(200).json(reviews);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch reviews" });
	}
};

export const getReviewById = async (req: Request, res: Response) => {
	try {
		const review = await Review.findById(req.params.id).populate(
			"user product",
		);
		if (!review) return res.status(404).json({ error: "Review not found" });
		res.status(200).json(review);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch review" });
	}
};

export const updateReview = async (req: Request, res: Response) => {
	try {
		const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!review) return res.status(404).json({ error: "Review not found" });
		res.status(200).json(review);
	} catch (error) {
		res.status(500).json({ error: "Failed to update review" });
	}
};

export const deleteReview = async (req: Request, res: Response) => {
	try {
		const review = await Review.findByIdAndDelete(req.params.id);
		if (!review) return res.status(404).json({ error: "Review not found" });

		// Update product rating and review count
		const product = await Product.findById(review.product);
		if (product) {
			product.ratingCount -= 1;
			product.rating =
				product.ratingCount > 0
					? (product.rating * (product.ratingCount + 1) - review.rating) /
					  product.ratingCount
					: 0;
			await product.save();
		}

		res.status(200).json({ message: "Review deleted" });
	} catch (error) {
		res.status(500).json({ error: "Failed to delete review" });
	}
};

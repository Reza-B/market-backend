import { Request, Response, NextFunction } from "express";
import Review from "../models/reviewModel";
import { reviewSchema } from "../validators/reviewValidator";

// ایجاد یک نقد و بررسی جدید
export const createReview = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { error } = reviewSchema.validate(req.body);
		if (error) {
			return res
				.status(400)
				.json({ status: "error", message: error.details[0].message });
		}

		const review = new Review(req.body);
		await review.save();
		res.status(201).json({ status: "success", data: review });
	} catch (error) {
		next(error);
	}
};

// به‌روزرسانی نقد و بررسی بر اساس شناسه
export const updateReview = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const { error } = reviewSchema.validate(req.body, { abortEarly: false });
		if (error) {
			return res
				.status(400)
				.json({ status: "error", message: error.details[0].message });
		}

		const review = await Review.findByIdAndUpdate(id, req.body, { new: true });
		if (!review) {
			return res
				.status(404)
				.json({ status: "error", message: "Review not found" });
		}

		res.status(200).json({ status: "success", data: review });
	} catch (error) {
		next(error);
	}
};

// دریافت اطلاعات یک نقد و بررسی بر اساس شناسه
export const getReviewById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const review = await Review.findById(id)
			.populate("user")
			.populate("product");

		if (!review) {
			return res
				.status(404)
				.json({ status: "error", message: "Review not found" });
		}

		res.status(200).json({ status: "success", data: review });
	} catch (error) {
		next(error);
	}
};

// دریافت تمام نقد و بررسی‌ها
export const getAllReviews = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const reviews = await Review.find().populate("user").populate("product");
		res.status(200).json({ status: "success", data: reviews });
	} catch (error) {
		next(error);
	}
};

// حذف یک نقد و بررسی بر اساس شناسه
export const deleteReview = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const review = await Review.findByIdAndDelete(id);

		if (!review) {
			return res
				.status(404)
				.json({ status: "error", message: "Review not found" });
		}

		res
			.status(204)
			.json({ status: "success", message: "Review deleted successfully" });
	} catch (error) {
		next(error);
	}
};

export const getReviewsByProductId = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { productId } = req.params;
		const reviews = await Review.find({ product: productId }).populate(
			"user",
			"firstName",
			"lastName",
			"profilePicture",
		);

		if (!reviews.length) {
			return res.status(404).json({
				status: "error",
				message: "No reviews found for this product",
			});
		}

		res.status(200).json({ status: "success", data: reviews });
	} catch (error) {
		next(error);
	}
};

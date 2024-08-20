import { Request, Response, NextFunction } from "express";
import Slider from "../models/sliderModel";
import multer from "multer";
import path from "path";
import fs from "fs";

// Multer تنظیمات آپلود تصویر
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/sliders"); // مسیر ذخیره تصاویر
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname)); // نام منحصربفرد برای هر تصویر
	},
});

const upload = multer({ storage: storage }).single("image");

// ایجاد یک اسلایدر جدید
export const createSlider = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	upload(req, res, async (err) => {
		if (err) {
			return res.status(500).json({ status: "error", message: err.message });
		}

		try {
			const { alt, redirectLink } = req.body;
			const slider = new Slider({
				image: req.file?.path || "", // مسیر فایل آپلود شده
				alt,
				redirectLink,
			});

			await slider.save();
			res.status(201).json({ status: "success", data: slider });
		} catch (error) {
			next(error);
		}
	});
};

// دریافت تمام اسلایدرها
export const getAllSliders = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const sliders = await Slider.find();
		res.status(200).json({ status: "success", data: sliders });
	} catch (error) {
		next(error);
	}
};

// دریافت یک اسلایدر بر اساس ID
export const getSliderById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const slider = await Slider.findById(id);

		if (!slider) {
			return res
				.status(404)
				.json({ status: "error", message: "Slider not found" });
		}

		res.status(200).json({ status: "success", data: slider });
	} catch (error) {
		next(error);
	}
};

// حذف اسلاید
export const deleteSlider = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;
		const slider = await Slider.findById(id);

		if (!slider) {
			return res
				.status(404)
				.json({ status: "error", message: "Slider not found" });
		}

		// حذف تصویر از سرور
		if (slider.image) {
			const imagePath = path.resolve(
				__dirname,
				"../uploads/sliders",
				path.basename(String(slider.image)),
			);
			if (fs.existsSync(imagePath)) {
				fs.unlinkSync(imagePath);
			}
		}

		await Slider.findByIdAndDelete(id);

		res
			.status(204)
			.json({ status: "success", message: "Slider deleted successfully" });
	} catch (error) {
		next(error);
	}
};

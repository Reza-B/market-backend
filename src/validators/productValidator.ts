import Joi from "joi";

// تعریف schema برای اعتبارسنجی داده‌های محصول
export const productSchema = Joi.object({
	name: Joi.string().required(),
	mainImage: Joi.string().uri().required(),
	images: Joi.array().items(Joi.string().uri()).optional(),
	rating: Joi.number().min(0).max(5).optional(),
	ratingCount: Joi.number().integer().min(0).optional(),
	keyFeatures: Joi.array().items(Joi.string()).required(),
	sizes: Joi.array().items(Joi.string()).optional(),
	description: Joi.string().required(),
	basePrice: Joi.number().min(0).required(), // قیمت اصلی
	discountedPrice: Joi.number().min(0).required(), // قیمت بعد از تخفیف
	isOnSale: Joi.boolean().optional(), // آیا محصول در فروش ویژه است یا نه
	discountPercentage: Joi.number().min(0).max(100).optional(), // درصد تخفیف
	category: Joi.string().required(),
}).custom((value, helpers) => {
	const { basePrice, discountedPrice, isOnSale, discountPercentage } = value;

	// وقتی محصول در فروش ویژه است
	if (isOnSale) {
		// اطمینان از ارائه درصد تخفیف
		if (discountPercentage === undefined) {
			return helpers.message({
				"any.custom":
					"Discount percentage must be provided when the product is on sale.",
			});
		}
		// محاسبه قیمت تخفیف‌خورده بر اساس درصد تخفیف
		const calculatedDiscountedPrice =
			basePrice - basePrice * (discountPercentage / 100);
		if (discountedPrice !== calculatedDiscountedPrice) {
			return helpers.message({
				"any.custom":
					"Discounted price does not match the calculated discounted price based on the discount percentage.",
			});
		}
	} else {
		// وقتی محصول در فروش ویژه نیست
		if (discountedPrice !== basePrice) {
			return helpers.message({
				"any.custom":
					"Discounted price must be equal to base price when the product is not on sale.",
			});
		}
	}

	return value;
});

import { Document } from "mongoose";

export interface IShipping extends Document {
	user: string; // شناسه کاربر (ObjectId به صورت رشته)
	address: string; // آدرس ارسال
	city: string; // شهر
	postalCode: string; // کد پستی
	country: string; // کشور
	shippingMethod: string; // روش ارسال
}

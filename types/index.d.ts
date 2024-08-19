// types/index.d.ts

import { Document } from "mongoose";
import { Request } from "express";
import { IUser } from "../models/userModel";

declare global {
	namespace Express {
		interface Request {
			user?: IUser; // اضافه کردن ویژگی user به تایپ Request
		}
	}
}

// تعریف تایپ برای مدل کاربر
export interface IUser extends Document {
	username: string;
	email: string;
	password: string;
	// سایر فیلدهای مورد نیاز
}

// تعریف تایپ برای مدل محصول
export interface IProduct extends Document {
	name: string;
	mainImage: string;
	additionalImages: string[];
	rating: number;
	features: string[];
	sizes: string[];
	description: string;
	reviews: IReview[]; // لینک به نظرات
	reviewCount: number;
	price: number;
	dateAdded: Date;
	category: ICategory; // لینک به دسته‌بندی
}

// تعریف تایپ برای مدل نظرات
export interface IReview extends Document {
	user: IUser; // لینک به کاربر
	product: IProduct; // لینک به محصول
	rating: number;
	comment: string;
	dateAdded: Date;
}

// تعریف تایپ برای مدل دسته‌بندی
export interface ICategory extends Document {
	name: string;
	description: string;
	parentCategory?: ICategory; // لینک به دسته‌بندی والد (اختیاری)
}

// تعریف تایپ برای مدل سفارش
export interface IOrder extends Document {
	user: IUser; // لینک به کاربر
	items: IOrderItem[]; // آیتم‌های موجود در سفارش
	totalAmount: number;
	status: string; // وضعیت سفارش
	shippingDetails: IShipping; // جزئیات حمل و نقل
	paymentDetails: IPayment; // جزئیات پرداخت
	datePlaced: Date;
}

// تعریف تایپ برای آیتم‌های سفارش
export interface IOrderItem {
	product: IProduct; // لینک به محصول
	quantity: number;
	price: number;
}

// تعریف تایپ برای جزئیات حمل و نقل
export interface IShipping extends Document {
	address: string;
	shippingMethod: string;
	trackingNumber: string;
	status: string;
}

// تعریف تایپ برای جزئیات پرداخت
export interface IPayment extends Document {
	method: string;
	amount: number;
	status: string;
}

// تعریف تایپ برای اطلاعات درخواست (Request) با ویژگی سفارشی `user`
declare global {
	namespace Express {
		interface Request {
			user?: IUser; // اضافه کردن ویژگی user به تایپ Request
		}
	}
}

// تعریف تایپ برای پاسخ API با ویژگی‌های مختلف
export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
	error?: string;
}

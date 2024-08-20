import { Document, ObjectId } from "mongoose";
import { Request } from "express";

export interface IUser extends Document {
	phone: string;
	email?: string;
	password?: string;
	firstName?: string;
	lastName?: string;
	profilePicture?: string;
	gender?: string;
	verificationCode?: string;
	isPhoneVerified: boolean;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IAdmin extends Document {
	phone: string;
	email?: string;
	password?: string;
	firstName?: string;
	lastName?: string;
	profilePicture?: string;
	gender?: string;
	verificationCode?: string;
	isPhoneVerified: boolean;
	role: string;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IProduct extends Document {
	name: string;
	mainImage: string;
	images: string[];
	rating: number;
	ratingCount: number;
	keyFeatures: string[];
	sizes: string[];
	description: string;
	isOnSale: boolean;
	discountPercentage: number;
	basePrice: number;
	discountedPrice: number;
	variants: IVariant[];
	category: ObjectId;
	createdAt: Date;
}

export interface IReview extends Document {
	product: ObjectId;
	user: ObjectId;
	rating: number;
	comment?: string;
	createdAt: Date;
}

export interface ICategory extends Document {
	name: string;
	slug?: string;
	products?: IProduct[];
}

export interface IOrder extends Document {
	user: IUser;
	cart: ICart;
	shipping: IShipping;
	payment: IPayment;
	status: string;
	createdAt: Date;
	totalAmount: number;
	products: Array<{
		product: ObjectId;
		quantity: number;
	}>;
}

export interface ICartItem {
	product: IProduct;
	quantity: number;
}

export interface ICart extends Document {
	user: ObjectId;
	items: ICartItem[];
	totalPrice: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface IShipping extends Document {
	user: ObjectId;
	address: string;
	city: string;
	postalCode: string;
	shippingMethod: string;
}

export interface IPayment extends Document {
	order: IOrder;
	amount: number;
	method: string;
	status: string;
	paymentDate: Date;
}

export interface ISlider extends Document {
	image: string;
	alt: string;
	redirectLink: string;
}

export interface IDiscount extends Document {
	code: string;
	percentage: number;
	validFrom: Date;
	validUntil: Date;
	usageLimit: number;
	usedCount: number;
	isActive: boolean;
}

export interface IInventory extends Document {
	product: IProduct;
	quantity: number;
}

export interface IVariant {
	name: string;
	additionalPrice: number;
}

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
	error?: string;
}

declare global {
	namespace Express {
		interface Request {
			user?: IUser;
			admin?: IAdmin;
		}
	}
}

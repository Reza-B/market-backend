import { Document, ObjectId } from "mongoose";

export interface IVariant {
	name: string;
	additionalPrice: number;
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

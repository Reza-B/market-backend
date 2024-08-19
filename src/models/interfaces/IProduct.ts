import { Document } from "mongoose";
import { ICategory } from "./ICategory";
import { IReview } from "./IReview";

export interface IProduct extends Document {
	name: string;
	mainImage: string;
	images: string[];
	rating: number;
	ratingCount: number;
	keyFeatures: string[];
	sizes: string[];
	description: string;
	reviews: IReview[];
	price: number;
	createdAt: Date;
	category: ICategory;
}

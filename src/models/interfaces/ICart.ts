import { Document } from "mongoose";
import { IProduct } from "./IProduct";

export interface ICartItem {
	product: IProduct;
	quantity: number;
}

export interface ICart extends Document {
	user: string;
	items: ICartItem[];
	totalPrice: number;
	createdAt: Date;
	updatedAt: Date;
}

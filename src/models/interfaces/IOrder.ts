import mongoose, { Document } from "mongoose";

import { ICart } from "./ICart";
import { IShipping } from "./IShipping";
import { IPayment } from "./IPayment";
import { IUser } from "./IUser";

export interface IOrder extends Document {
	user: IUser;
	cart: ICart;
	shipping: IShipping;
	payment: IPayment;
	status: string;
	createdAt: Date;
	totalAmount: number;
	products: Array<{
		product: mongoose.Types.ObjectId;
		quantity: number;
	}>;
}

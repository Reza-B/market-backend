import { Document } from "mongoose";
import { IOrder } from "./IOrder"; // مسیر صحیح به اینترفیس

export interface IPayment extends Document {
	order: IOrder;
	amount: number;
	method: string;
	status: string;
	paymentDate: Date;
}

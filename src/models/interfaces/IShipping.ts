import { Document } from "mongoose";

export interface IShipping extends Document {
	user: string;
	address: string;
	city: string;
	postalCode: string;
	shippingMethod: string;
}

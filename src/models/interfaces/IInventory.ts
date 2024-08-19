import { Document } from "mongoose";
import { IProduct } from "./IProduct";

export interface IInventory extends Document {
	product: IProduct;
	quantity: number;
}

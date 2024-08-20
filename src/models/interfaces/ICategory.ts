import { Document } from "mongoose";
import { IProduct } from "./IProduct";

export interface ICategory extends Document {
	name: string;
	image: string;
	slug?: string;
	products?: IProduct[];
}

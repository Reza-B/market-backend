import { Document } from "mongoose";

export interface ISlider extends Document {
	image: string;
	alt: string;
	redirectLink: string;
}

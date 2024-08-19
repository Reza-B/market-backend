// src/models/ImageSlider.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IImageSlider extends Document {
	slug: string;
	imgUrl: string;
}

const ImageSliderSchema: Schema = new Schema({
	slug: { type: String, required: true },
	imgUrl: { type: String, required: true },
});

export default mongoose.model<IImageSlider>("ImageSlider", ImageSliderSchema);

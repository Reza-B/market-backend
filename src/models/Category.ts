// src/models/Category.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
	name: string;
	slug: string;
	imgUrl: string;
}

const CategorySchema: Schema = new Schema({
	name: { type: String, required: true },
	slug: { type: String, required: true },
	imgUrl: { type: String, required: true },
});

export default mongoose.model<ICategory>("Category", CategorySchema);

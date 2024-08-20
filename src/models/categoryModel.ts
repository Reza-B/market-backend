import mongoose, { Schema } from "mongoose";
import { ICategory } from "./interfaces/ICategory";

const CategorySchema: Schema = new Schema({
	slug: { type: String, required: true },
	name: { type: String, required: true },
	products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
	image: { type: String },
});

export default mongoose.model<ICategory>("Category", CategorySchema);

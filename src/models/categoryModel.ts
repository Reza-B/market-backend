import mongoose, { Schema } from "mongoose";

import { ICategory } from "./interfaces/ICategory";

const CategorySchema: Schema = new Schema({
	name: { type: String, required: true },
	description: { type: String },
	products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

export default mongoose.model<ICategory>("Category", CategorySchema);

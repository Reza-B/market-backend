// src/models/Color.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IColor extends Document {
	name: string;
	hashcode: string;
}

const ColorSchema: Schema = new Schema({
	name: { type: String, required: true },
	hashcode: { type: String, required: true },
});

export default mongoose.model<IColor>("Color", ColorSchema);

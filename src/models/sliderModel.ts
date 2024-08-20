import mongoose, { Schema } from "mongoose";

const SliderSchema: Schema = new Schema({
	image: { type: String, required: true },
	alt: { type: String, required: true },
	redirectLink: { type: String, required: true },
});

export default mongoose.model("Slider", SliderSchema);

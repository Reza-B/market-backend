// src/config/db.ts
import mongoose from "mongoose";

const connectDB = async () => {
	try {
		await mongoose.connect(
			process.env.MONGO_URI || "mongodb://127.0.0.1:27017/torshinmarket",
		);
		console.log("MongoDB connected...");
	} catch (err: any) {
		console.error(err.message);
		process.exit(1);
	}
};

export default connectDB;

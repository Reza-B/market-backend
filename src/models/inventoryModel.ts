import mongoose, { Schema } from "mongoose";

import { IInventory } from "./interfaces/IInventory";

const InventorySchema: Schema = new Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
	quantity: { type: Number, required: true, default: 0 },
});

export default mongoose.model<IInventory>("Inventory", InventorySchema);

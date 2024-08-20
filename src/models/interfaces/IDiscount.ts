import { Document } from "mongoose";

export interface IDiscount extends Document {
	code: string;
	percentage: number;
	validFrom: Date;
	validUntil: Date;
	usageLimit: number;
	usedCount: number;
	isActive: boolean;
}

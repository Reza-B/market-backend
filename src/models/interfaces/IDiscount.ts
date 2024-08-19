import { Document } from "mongoose";

export interface IDiscount extends Document {
	code: string; // کد تخفیف
	percentage: number; // درصد تخفیف
	validFrom: Date; // تاریخ شروع اعتبار
	validUntil: Date; // تاریخ پایان اعتبار
	usageLimit: number; // حداکثر تعداد استفاده
	usedCount: number; // تعداد دفعات استفاده شده
	isActive: boolean; // وضعیت فعال بودن تخفیف
}

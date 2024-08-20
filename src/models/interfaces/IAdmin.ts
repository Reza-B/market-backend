import { Document } from "mongoose";

export interface IAdmin extends Document {
	phone: string;
	email?: string;
	password?: string;
	firstName?: string;
	lastName?: string;
	profilePicture?: string;
	gender?: string;
	verificationCode?: string;
	isPhoneVerified: boolean;
	role: string;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

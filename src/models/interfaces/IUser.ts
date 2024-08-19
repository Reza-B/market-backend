import { Document } from "mongoose";

export interface IUser extends Document {
	phone: string;
	email?: string;
	password?: string;
	firstName?: string;
	lastName?: string;
	profilePicture?: string;
	gender?: string;
	verificationCode?: string;
	isPhoneVerified: boolean;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

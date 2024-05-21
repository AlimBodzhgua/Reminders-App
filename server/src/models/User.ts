import mongoose from 'mongoose';
import { IUser } from '../types/types';

const UserSchema = new mongoose.Schema<IUser>({
	login: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	passwordHash: {
		type: String,
		required: true,
	},
	avatarUrl: String,
})

const UserModal = mongoose.model<IUser>('User', UserSchema);

export default UserModal;
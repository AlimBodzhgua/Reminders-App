import mongoose from 'mongoose';
import { IUser } from '../types/types';
import { ReminderSchema } from './Reminder';

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
	reminders: {
		type: [ReminderSchema],
	}
})

const UserModal = mongoose.model<IUser>('User', UserSchema);

export default UserModal;
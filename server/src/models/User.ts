import mongoose from 'mongoose';
import { IUser } from '../types/types';
import { ListSchema } from './List';
import { initialLists } from '../constants/lists';

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
	lists: {
		type: [ListSchema],
		default: initialLists,
	}
})

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;

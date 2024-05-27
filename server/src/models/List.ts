import mongoose from 'mongoose';
import { IList } from '../types/types';
import { ReminderSchema } from './Reminder';

export const ListSchema = new mongoose.Schema<IList>({
	name: {
		require: true,
		type: String,
	},
	icon: {
		require: true,
		type: String
	},
	color: {
		require: true,
		type: String,
	},
	pinned: {
		type: Boolean,
		require: true,
	},
	reminders: [ReminderSchema]
})

const ListModel = mongoose.model('List', ListSchema);

export default ListModel;
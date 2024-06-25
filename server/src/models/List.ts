import mongoose from 'mongoose';
import { ReminderSchema } from './Reminder';
import type { IList } from '../types/types';

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
	_isMutable: {
		type: Boolean,
		require: true,
		immutable: true,
	},
	sortField: {
		type: String,
		require: true,
	},
	sortDirection: {
		type: String,
		require: true,
	},
	reminders: [ReminderSchema]
})

const ListModel = mongoose.model('List', ListSchema);

export default ListModel;
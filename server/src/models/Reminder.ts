import mongoose from 'mongoose';
import type { IReminder } from '../types/types';

export const ReminderSchema = new mongoose.Schema<IReminder>({
	title: {
		type: String,
		required: true,
	},
	notes: String,
	url: String,
	priority: String,
	isCompleted: {
		type: Boolean,
		require: true,
	},
	isFlagged: {
		type: Boolean,
		require: true,
	},
	details: {
		_id: false,
		location: String,
		time: String,
		date: String,
	},
}, { timestamps: true })

const ReminderModel = mongoose.model<IReminder>('Reminder', ReminderSchema);

export default ReminderModel;
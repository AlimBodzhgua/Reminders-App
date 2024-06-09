import mongoose from 'mongoose';
import { IReminder } from '../types/types';

export const ReminderSchema = new mongoose.Schema<IReminder>({
	title: {
		type: String,
		required: true
	},
	notes: String,
	isCompleted: Boolean,
	details: {
		_id: false,
		location: String,
		time: String,
		date: String,
	}
})

const ReminderModel = mongoose.model<IReminder>('Reminder', ReminderSchema);

export default ReminderModel;
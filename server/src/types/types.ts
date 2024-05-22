import { Types } from 'mongoose';

interface DocResult<T> {
	_doc: T;
}

export interface IUser extends DocResult<IUser> {
	_id: Types.ObjectId;
	login: string;
	email: string;
	passwordHash: string;
	avatarUrl?: string;
	reminders: Array<IReminder>;
}

export interface IDetails {
	date?: string;
	time?: string;
	location?: string;
}

export interface IReminder extends DocResult<IReminder> {
	_id: Types.ObjectId;
	title: string;
	notes?: string;
	details?: IDetails
}
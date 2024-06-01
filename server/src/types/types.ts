import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';

interface DocResult<T> {
	_doc: T;
}

export type DecodePayloadType = JwtPayload & { _id: string };

export interface IUser extends DocResult<IUser> {
	_id: Types.ObjectId;
	login: string;
	email: string;
	passwordHash: string;
	avatarUrl?: string;
	lists: Array<IList>;
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
	details?: IDetails;
}

export interface IList extends DocResult<IList> {
	_id: Types.ObjectId;
	name: string;
	color: string;
	pinned: boolean;
	icon: string;
	reminders: Array<IReminder>;
}

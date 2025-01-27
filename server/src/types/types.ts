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

export type PriorityType = 'low' | 'medium' | 'high';

export interface IReminder extends DocResult<IReminder> {
	_id: Types.ObjectId;
	listId: Types.ObjectId;
	title: string;
	notes?: string;
	url?: string;
	priority?: PriorityType;
	isFlagged: boolean;
	isCompleted: boolean;
	details?: IDetails;
}


export type SortFieldType = 'name' | 'deadline' | 'creation' | 'priority';
export type SortDirectionType = 'asc' | 'desc';

export interface IList extends DocResult<IList> {
	_id: Types.ObjectId;
	_isMutable: boolean;
	name: string;
	color: string;
	pinned: boolean;
	sortField: SortFieldType;
	sortDirection: SortDirectionType;
	icon: string;
	reminders: Array<IReminder>;
}

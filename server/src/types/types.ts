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
}

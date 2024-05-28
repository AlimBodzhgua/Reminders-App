import { IList } from './list';

export interface IUser {
	_id: string;
	login?: string;
	email: string;
	token: string;
	avatarUrl?: string;
	lists: Array<IList>;
};
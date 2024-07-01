import { IList } from 'types/list';
import { IReminder } from 'types/reminder';
import { IUser } from 'types/user';

const authData: IUser = {
	_id: '667a6de9317d486cfe6acdb4',
	login: 'testLogin',
	email: 'test@mail.ru',
	token: 'testToken123qweasdzxc',
	lists: [] as IList[],
};

export const filledAuthData = {
	authData: authData,
	isLoading: false,
};

export const withUser = {
	authData: {},
	isLoading: false,
};

export const emptyUser = {
	authData: undefined,
	isLoading: false,
};

export const userLoading = {
	authData: {},
	isLoading: true,
};

export const activeList = {
	lsit: {},
	listType: 'today',
};

export const searchBar = {
	value: '',
	isSearching: false,
	searchResult: [],
};

export const todayList: IList = {
	name: 'Today',
	icon: 'UnorderedListOutlined',
	color: 'blue',
	pinned: true,
	_isMutable: false,
	sortField: 'name',
	sortDirection: 'asc',
	reminders: [],
	_id: '6679b87c317d486cfe6acd8a',
};

export const mutableListItem: IList = {
	name: 'Test',
	icon: 'UnorderedListOutlined',
	color: 'blue',
	pinned: true,
	_isMutable: true,
	sortField: 'name',
	sortDirection: 'asc',
	reminders: [],
	_id: '6479b87c317d486cfe6acd8a',
};

export const reminder: IReminder = {
	title: 'Test',
	notes: 'test notes',
	isCompleted: false,
	priority: 'low',
	isFlagged: false,
	_id: '6682862c7e22d606489783ed'
};
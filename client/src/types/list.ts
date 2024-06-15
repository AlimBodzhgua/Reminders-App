import { mapListToIcon } from 'constants/iconsList';
import { IReminder } from './reminder';

export type ListsIconType = keyof typeof mapListToIcon;

export interface IList {
	_id: string;
	name: string;
	icon: ListsIconType;
	color: string;
	pinned: boolean;
	readonly isMutable: boolean;
	reminders: Array<IReminder>;
};

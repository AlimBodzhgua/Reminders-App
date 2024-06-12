import { FC, memo } from 'react';
import { List } from 'antd';
import { useAppSelector } from 'hooks/redux';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import { RemindersListItem } from './RemindersListItem/RemindersListItem';
import { RemindersListHeader } from './RemindersListHeader';

export const RemindersList: FC = memo(() => {
	const activeList = useAppSelector(selectActiveList);

	return (
		<List header={<RemindersListHeader />}>
			{activeList && activeList.reminders.map((reminder) => (
				<RemindersListItem
					reminder={reminder}
					key={reminder._id}
				/>
			))}			
		</List>
	);
});
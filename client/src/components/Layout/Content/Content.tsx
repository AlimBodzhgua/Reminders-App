import { FC, memo, useState, useEffect, useMemo } from 'react';
import { Flex, Spin } from 'antd';
import { useAppSelector } from 'hooks/redux';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import { AddReminderForm } from 'components/AddReminderForm/AddReminderForm';
import { RemindersList } from 'components/RemindersList';
import { getRemindersListType } from 'utils/utils';
import {
	selectFlaggedReminders,
	selectTodaysReminders,
	selectUserAuthData,
	selectUserIsLoading,
} from 'store/selectors/userSelectors';

import type { IReminder, RemindersListType } from 'types/reminder';

import { StyledContent, StyledTitle } from './Content.styles';


export const Content: FC = memo(() => {
	const activeList = useAppSelector(selectActiveList);
	const [showForm, setShowForm] = useState<boolean>(false);
	const authData = useAppSelector(selectUserAuthData);
	const isLoading = useAppSelector(selectUserIsLoading);
	const flaggedReminders = useAppSelector(selectFlaggedReminders);
	const todaysReminders = useAppSelector(selectTodaysReminders);
	const [currentList, setCurrentList] = useState<RemindersListType>('others');

	const mapToRemindersList: Record<RemindersListType, IReminder[]> = useMemo(() => ({
		'flagged': flaggedReminders,
		'todays': todaysReminders,
		'others': activeList?.reminders || [],
		'scheduled': activeList?.reminders || [],
		'all': activeList?.reminders || [],
	}), [activeList])

	const showEmptyTitle = !mapToRemindersList[currentList].length && !showForm;

	useEffect(() => {
		if (activeList) {
			setCurrentList(getRemindersListType(activeList));
		}
	}, [activeList])


	const onToggleShowForm = () => {
		setShowForm(prev => !prev);
	};

	if (isLoading) {
		return (
			<StyledContent>
				<Flex justify='center' align='center' style={{ height: '80%' }}>
					<Spin size='large' />
				</Flex>
			</StyledContent>
		);
	}

	if (!authData) {
		return (
			<StyledContent>
				<Flex justify='center' align='center' style={{ height: '80%' }}>
					<StyledTitle $color='#D0D0D0' $weight={500}>
						Login or register to have access
					</StyledTitle>
				</Flex>
			</StyledContent>
		);
	}

	return (
		<StyledContent onClick={onToggleShowForm}>
			<RemindersList reminders={mapToRemindersList[currentList]}/>

			{showEmptyTitle &&
				<Flex justify='center' align='center' style={{ height: '80%' }}>
					<StyledTitle $color='#D0D0D0' $weight={500}>
						No reminders
					</StyledTitle>
				</Flex>
			}

			{showForm && <AddReminderForm onSuccess={onToggleShowForm}/>}
		</StyledContent>
	);
});

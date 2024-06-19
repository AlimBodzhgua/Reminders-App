import { FC, memo, useState } from 'react';
import { Flex, Spin } from 'antd';
import { useAppSelector } from 'hooks/redux';
import { AddReminderForm } from 'components/AddReminderForm/AddReminderForm';
import { RemindersList } from 'components/RemindersList';
import {
	selectUserAuthData,
	selectUserIsLoading,
} from 'store/selectors/userSelectors';

import { useActiveList } from 'hooks/useActiveList';

import { StyledContent, StyledTitle } from './Content.styles';


export const Content: FC = memo(() => {
	const [showForm, setShowForm] = useState<boolean>(false);
	const authData = useAppSelector(selectUserAuthData);
	const isLoading = useAppSelector(selectUserIsLoading);
	const { currentList } = useActiveList();
	const showEmptyTitle = !currentList.length && !showForm;

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
			<RemindersList reminders={currentList} />
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

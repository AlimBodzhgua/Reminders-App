import { FC, memo, useState } from 'react';
import { Flex, Spin } from 'antd';
import { useAppSelector } from 'hooks/redux';
import { AddReminderForm } from 'components/AddReminderForm/AddReminderForm';
import { RemindersList } from 'components/RemindersList';
import { useActiveList } from 'hooks/useActiveList';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import {
	selectUserAuthData,
	selectUserIsLoading,
} from 'store/selectors/userSelectors';
import {
	selectSearchBarIsSearching,
	selectSearchBarSearchResult,
} from 'store/selectors/searchBarSelectors';

import { StyledContent, StyledTitle } from './Content.styles';

export const Content: FC = memo(() => {
	const [showForm, setShowForm] = useState<boolean>(false);
	const { currentList } = useActiveList();
	const authData = useAppSelector(selectUserAuthData);
	const isLoading = useAppSelector(selectUserIsLoading);
	const searchResult = useAppSelector(selectSearchBarSearchResult);
	const isSearching = useAppSelector(selectSearchBarIsSearching);
	const activeList = useAppSelector(selectActiveList);

	const isEmptyReminders = !currentList.length && !showForm;
	const isEmptySearch = !searchResult.length && !showForm;
	const showEmpty = isSearching ? isEmptySearch : isEmptyReminders;

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
		<StyledContent
			onClick={onToggleShowForm}
			$thumbColor={activeList?.color}
		>
			<RemindersList reminders={isSearching ? searchResult : currentList} />
			{showEmpty &&
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

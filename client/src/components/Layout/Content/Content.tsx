import { FC, memo } from 'react';
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
import { StyledContent, StyledTitle, StyledSubtitle, StyledLockFilled } from './Content.styles';

interface ContentProps {
	showForm: boolean;
	onToggleShowForm: () => void;
}

export const Content: FC<ContentProps> = memo((props) => {
	const { showForm, onToggleShowForm } = props;
	const { currentList } = useActiveList();
	const authData = useAppSelector(selectUserAuthData);
	const isLoading = useAppSelector(selectUserIsLoading);
	const searchResult = useAppSelector(selectSearchBarSearchResult);
	const isSearching = useAppSelector(selectSearchBarIsSearching);
	const activeList = useAppSelector(selectActiveList);

	const isEmptyReminders = !currentList.length && !showForm;
	const isEmptySearch = !searchResult.length && !showForm;
	const showEmpty = isSearching ? isEmptySearch : isEmptyReminders;

	if (isLoading) {
		return (
			<StyledContent data-testid='content'>
				<Flex justify='center' align='center' style={{ height: '80%' }}>
					<Spin size='large' data-testid='spinner'/>
				</Flex>
			</StyledContent>
		);
	}

	if (!authData) {
		return (
			<StyledContent data-testid='content'>
				<Flex
					justify='center'
					align='center'
					vertical
					style={{ height: '80%' }}
				>
					<StyledLockFilled />
					<StyledTitle $color='#D0D0D0' $weight={500}>
						Restricted Access
					</StyledTitle>
					<StyledSubtitle $color='#bfbfbf' $weight={500} level={4}>
						You don't have permission to this content
						Login or register to have access
					</StyledSubtitle>
				</Flex>
			</StyledContent>
		);
	}

	return (
		<StyledContent
			onClick={onToggleShowForm}
			$thumbColor={activeList?.color}
			data-testid='content'
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

import { FC, memo, useState } from 'react';
import { Button, Flex, Space, Spin } from 'antd';
import { useAppSelector } from 'hooks/redux';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import { AddReminderForm } from 'components/AddReminderForm/AddReminderForm';
import { RemindersList } from 'components/RemindersList';
import { selectUserAuthData, selectUserIsLoading } from 'store/selectors/userSelectors';
import { StyledPlusOutlined, StyledContent, StyledTitle } from './Content.styles';

export const Content: FC = memo(() => {
	const activeList = useAppSelector(selectActiveList);
	const [showForm, setShowForm] = useState<boolean>(false);
	const authData = useAppSelector(selectUserAuthData);
	const isLoading = useAppSelector(selectUserIsLoading);
	const showEmptyTitle = !activeList?.reminders.length && !showForm;

	const onShowForm = () => {
		setShowForm(true);
	};

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
		)
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
			<Flex justify='space-between' align='center'>
				<Space>
					<StyledTitle
						$color={activeList?.color}
						editable={{
							triggerType: ['text'],
							enterIcon: '',
						}}
					>
						{activeList?.name}
					</StyledTitle>
					<Button
						type='text'
						icon={<StyledPlusOutlined />}
						style={{marginBottom: '1em'}}
						onClick={onShowForm}
					/>
				</Space>
				<StyledTitle $color={activeList?.color} $weight={500}>
					{activeList?.reminders.length}
				</StyledTitle>
			</Flex>
			{activeList?.reminders.length && <RemindersList />}
			{showForm && <AddReminderForm onSuccess={onToggleShowForm}/>}

			{showEmptyTitle &&
				<Flex justify='center' align='center' style={{ height: '80%' }}>
					<StyledTitle $color='#D0D0D0' $weight={500}>
						No reminders
					</StyledTitle>
				</Flex>
			}
		</StyledContent>
	);
});

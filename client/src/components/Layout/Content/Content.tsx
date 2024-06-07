import { FC, memo, useState } from 'react';
import { Button, Flex, Space } from 'antd';
import { useAppSelector } from 'hooks/redux';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import { AddReminderForm } from 'components/AddReminderForm/AddReminderForm';
import { StyledPlusOutlined, StyledContent, StyledTitle } from './Content.styles';
import { selectUserAuthData } from 'store/selectors/userSelectors';

export const Content: FC = memo(() => {
	const activeList = useAppSelector(selectActiveList);
	const [showForm, setShowForm] = useState<boolean>(false);
	const authData = useAppSelector(selectUserAuthData);
	const showEmptyTitle = !activeList?.reminders.length && !showForm;

	const onShowForm = () => {
		setShowForm(true);
	};

	const onToggleShowForm = () => {
		setShowForm(prev => !prev);
	};

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
			
			{showForm && <AddReminderForm />}

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

import { FC, CSSProperties, memo, useState, MouseEvent } from 'react';
import { Button, Flex, Layout, Space, Typography } from 'antd';
import { useAppSelector } from 'hooks/redux';
import { selectActiveList } from 'store/selectors/activeListSelectors';
import { AddReminderForm } from 'components/AddReminderForm';
import { PlusOutlined } from '@ant-design/icons';


const contentStyle: CSSProperties = {
	padding: '15px 30px',
	color: '#fff',
	backgroundColor: '#ffff',
};

export const Content: FC = memo(() => {
	const activeList = useAppSelector(selectActiveList);
	const [showForm, setShowForm] = useState<boolean>(false);
	const showEmptyTitle = !activeList?.reminders.length && !showForm;

	const onShowForm = () => {
		setShowForm(true);
	}

	const onToggleShowForm = () => {
		setShowForm(prev => !prev);
	}

	return (
		<Layout.Content style={contentStyle} onClick={onToggleShowForm}>
			<Flex justify='space-between' align='center'>
				<Space>
					<Typography.Title
						style={{ color: activeList?.color, fontWeight: 700 }}
						editable={{
							triggerType: ['text'],
							enterIcon: '',
						}}
					>
						{activeList?.name}
					</Typography.Title>
					<Button
						type='text'
						icon={<PlusOutlined style={{color: '#000', fontSize: '28px'}}/>}
						style={{marginBottom: '1em'}}
						onClick={onShowForm}
					/>
				</Space>
					<Typography.Title style={{ color: activeList?.color, marginTop: 0 }}>
						{activeList?.reminders.length}
					</Typography.Title>
					
			</Flex>
			{showForm && <AddReminderForm />}

			{showEmptyTitle &&
				<Flex justify='center' align='center' style={{ height: '80%' }}>
					<Typography.Title level={1} style={{color: '#D0D0D0'}}>
						No reminders
					</Typography.Title>
				</Flex>
			}
		</Layout.Content>
	);
});

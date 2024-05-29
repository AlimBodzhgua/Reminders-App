import { FC, CSSProperties, memo, useState } from 'react';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Layout, Input, Button, Modal, Flex } from 'antd';
import { AddListForm } from 'components/AddListForm';
import { MyLists } from 'components/MyLists';

const siderStyle: CSSProperties = {
	textAlign: 'center',
	color: '#fff',
	backgroundColor: '#F5F6F7',
	padding: '35px 12px'
};

export const Sider: FC = memo(() => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const onOpenModal = () => {
		setIsOpen(true);
	};

	const onCloseModal = () => {
		setIsOpen(false);
	};

	return (
		<Layout.Sider width='25%' style={siderStyle}>
			<Flex vertical>
				<Input
					addonBefore={<SearchOutlined />}
					placeholder='Search'
					value={searchValue}
					onChange={onSearch}
				/>
				<MyLists />
			</Flex>
			<Button
				type='text'
				icon={<PlusCircleOutlined />}
				onClick={onOpenModal}
			>Add List</Button>
			<Modal
				title='New list'
				open={isOpen}
				onCancel={onCloseModal}
				footer={null}
			>
				<AddListForm />
			</Modal>
		</Layout.Sider>
	);
});

import { FC, CSSProperties, memo, useState, useCallback } from 'react';
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Layout, Input, Button, Flex } from 'antd';
import { PinnedLists } from 'components/PinnedLists/PinnedLists';
import { UnpinnedLists } from 'components/UnpinnedLists/UnpinnedLists';
import { AddListModal } from 'components/AddListModal';

const siderStyle: CSSProperties = {
	textAlign: 'center',
	color: '#E9E9E9',
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

	const onCloseModal = useCallback(() => {
		setIsOpen(false);
	}, []);

	return (
		<Layout.Sider width={315} style={siderStyle}>
			<Flex vertical gap='5px'>
				<Input
					addonBefore={<SearchOutlined />}
					placeholder='Search'
					value={searchValue}
					onChange={onSearch}
				/>
				<PinnedLists />
				<UnpinnedLists />
			</Flex>
			<Button
				type='text'
				icon={<PlusCircleOutlined />}
				onClick={onOpenModal}
			>
				Add List
			</Button>
			<AddListModal isOpen={isOpen} onClose={onCloseModal} />
		</Layout.Sider>
	);
});

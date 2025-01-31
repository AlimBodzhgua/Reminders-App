import { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { Dropdown, MenuProps } from 'antd';
import { CheckOutlined, DeleteFilled, EditFilled, PushpinOutlined } from '@ant-design/icons';
import { useListActions } from 'hooks/useListActions';
import { UpdateListModal } from 'components/ListForms';
import type { IList } from 'types/list';
import UnpinOutlined from 'assets/icons/unpin.svg';

type ListType = 'pinned' | 'unpinned';

interface ListDropdownMenuProps {
	children: ReactNode;
	listType: ListType;
	list: IList;
	disabled?: boolean;
}

export const ListDropdownMenu: FC<ListDropdownMenuProps> = (props) => {
	const {
		list,
		listType,
		children,
		disabled = false,
	} = props;
	const {
		onRemove,
		onUpdate,
		onTogglePin,
		onSelectList,
	} = useListActions({ list, onEscape: () => console.log('escape')});

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const onToggleIsOpen = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	const items: MenuProps['items'] = useMemo(() => ([
		{
			label: 'Set as active list',
			key: '0',
			icon: <CheckOutlined />,
			onClick: onSelectList,
		},
		{
			label: 'Edit list',
			key: '1',
			icon: <EditFilled />,
			onClick: onToggleIsOpen,
		},
		{
			label: 'Delete list',
			key: '2',
			icon: <DeleteFilled />,
			onClick: onRemove,
		},
		listType === 'pinned' ? {
			label: 'Unpin list',
			key: '3',
			icon: <UnpinOutlined />,
			onClick: onTogglePin,
		} : {
			label: 'Pin list',
			key: '3',
			icon: <PushpinOutlined />,
			onClick: onTogglePin,
		},
	]), [onRemove, onTogglePin, onToggleIsOpen, listType]);

	return (
		<>
			<UpdateListModal
				initialColor={list.color}
				initialName={list.name}
				initialIcon={list.icon}
				listId={list._id}
				isOpen={isOpen}
				onClose={onToggleIsOpen}
			/>
			<Dropdown menu={{ items }} trigger={['contextMenu']} disabled={disabled}>
				{children}
			</Dropdown>
		</>
	);
}
import {
	FC,
	useRef,
	useMemo,
	useState,
	useEffect,
	CSSProperties,
	useCallback,
} from 'react';
import {
	DashOutlined,
	PushpinOutlined,
	DeleteOutlined,
} from '@ant-design/icons';
import { Flex, Avatar, List, Input, Dropdown, Typography } from 'antd';
import { useAppDispatch } from 'hooks/redux';
import { removeList, updateList } from 'store/actions/userActions';
import { mapListToIcon } from 'constants/iconsList';
import { IList } from 'types/list';
import { useHover } from 'hooks/useHover';

import type { InputRef, MenuProps } from 'antd';

interface MyListsItemProps {
	list: IList;
}

const listItemStyle: CSSProperties = {
	padding: '8px 12px',
	borderRadius: '8px',
	color: '#515151',
}

export const UnpinnedListItem: FC<MyListsItemProps> = ({ list }) => {
	const dispatch = useAppDispatch();
	const [isHover, hoverProps] = useHover();
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const inputRef = useRef<InputRef>(null);

	useEffect(() => {
		window.addEventListener('keydown', (e) => {
			if (e.code === 'Escape' && isEdit) {
				setIsEdit(false);
			}
		})
	}, [isEdit])

	const onRemove = useCallback(() => {
		dispatch(removeList(list._id));
	}, [dispatch])

	const onPin = useCallback(() => {
		dispatch(updateList({_id: list._id, pinned: true}));
	}, [dispatch])

	const onEdit = useCallback(() => {
		setIsEdit(true);
	}, [])

	const onBlurInput = useCallback(() => {
		setIsEdit(false);
	}, [])


	const items: MenuProps['items'] = useMemo(() => [
		{ key: '1', label: <PushpinOutlined onClick={onPin} /> },
		{ key: '2', label: <DeleteOutlined onClick={onRemove} /> },
	], []);

	const hoverExtraContent = (
		<Dropdown menu={{ items }} placement='bottom'>
			<DashOutlined rotate={90} style={{ cursor: 'pointer' }}/>
		</Dropdown>
	)

	return (
		<List.Item
			actions={[isHover && hoverExtraContent]}
			extra={list.reminders.length}
			style={{...listItemStyle, backgroundColor: isHover ? '#E9E9E9' : ''}}
			onDoubleClick={onEdit}
			{...hoverProps}
		>
			<Flex
				gap='10px'
				align='center'
				justify='space-between'
				style={{ width: '90%' }}
			>
				<Flex align='center' gap='10px'>
					<Avatar
						icon={mapListToIcon[list.icon]}
						style={{ backgroundColor: list.color }}
					/>
					{isEdit 
						? 	<Input
								defaultValue={list.name}
								style={{ width: '75%' }}
								ref={inputRef}
								onBlur={onBlurInput}
								autoFocus
							/>
						:   <div>{list.name}</div>
					}
				</Flex>
			</Flex>
		</List.Item>
	);
};
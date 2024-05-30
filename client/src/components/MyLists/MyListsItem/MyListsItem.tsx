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
	CheckOutlined,
} from '@ant-design/icons';
import { Flex, Avatar, List, Input, Dropdown } from 'antd';
import { useAppDispatch } from 'hooks/redux';
import { removeList } from 'store/actions/userActions';
import { mapListToIcon } from 'constants/iconsList';
import { IList } from 'types/list';
import { useHover } from 'hooks/useHover';

import type { InputRef, MenuProps } from 'antd';
import './MyListItem.css';

const listItemHoverStyle: CSSProperties = {
	backgroundColor: '#E9E9E9',
	borderRadius: '10px',
}

interface MyListsItemProps {
	list: IList;
}

export const MyListsItem: FC<MyListsItemProps> = ({ list }) => {
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

	const onPin = () => useCallback(() => {
		console.log('pin')
	}, [])

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
			style={isHover ? listItemHoverStyle : {}}
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
								//addonAfter={<CheckOutlined />}
							/>
						:   <div>{list.name}</div>
					}
				</Flex>
			</Flex>
		</List.Item>
	);
};
import {
	FC,
	useRef,
	useMemo,
	useState,
	useEffect,
	CSSProperties,
	useCallback,
	ChangeEvent,
} from 'react';
import {
	PushpinOutlined,
	DeleteOutlined,
	EnterOutlined,
} from '@ant-design/icons';
import { Flex, Avatar, List, Input, Dropdown } from 'antd';
import { useAppDispatch } from 'hooks/redux';
import { removeList, updateList } from 'store/actions/userActions';
import { mapListToIcon } from 'constants/iconsList';
import { IList } from 'types/list';
import { useHover } from 'hooks/useHover';
import DotesIcon from 'assets/icons/dotes.svg';

import type { InputRef, MenuProps } from 'antd';

interface MyListsItemProps {
	list: IList;
}

const listItemStyle: CSSProperties = {
	padding: '8px 12px',
	borderRadius: '8px',
	color: '#515151',
};

const extraItemStyle: CSSProperties = {
	fontWeight: 600,
	fontSize: '18px',
	color: '#8c8c8c',
	lineHeight: 1.4,
};

export const UnpinnedListItem: FC<MyListsItemProps> = ({ list }) => {
	const dispatch = useAppDispatch();
	const [value, setValue] = useState<string>(list.name);
	const [isHover, hoverProps] = useHover();
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const inputRef = useRef<InputRef>(null);

	const onRemove = useCallback(() => {
		dispatch(removeList(list._id));
	}, [dispatch]);

	const onPin = useCallback(() => {
		dispatch(updateList({ _id: list._id, pinned: true }));
	}, [dispatch]);

	const onSave = useCallback(async () => {
		const { meta } = await dispatch(updateList({_id: list._id, name: value}));

		if (meta.requestStatus === 'fulfilled') {
			setIsEdit(false);
		}
	}, [dispatch, value]);

	const onEdit = useCallback(() => {
		setIsEdit(true);
	}, []);

	const onBlurInput = useCallback(() => {
		setIsEdit(false);
		setValue(list.name);
	}, []);

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const onEscaprePress = useCallback((e: KeyboardEvent) => {
		if (e.code === 'Escape') {
			onBlurInput();
		}
	}, [onBlurInput]);

	useEffect(() => {
		window.addEventListener('keydown', onEscaprePress);

		return () => window.removeEventListener('keydown', onEscaprePress);
	}, []);


	const items: MenuProps['items'] = useMemo(() => [
		{ key: '1', label: <PushpinOutlined onClick={onPin} /> },
		{ key: '2', label: <DeleteOutlined onClick={onRemove} /> },
	], []);

	const hoverExtraContent = (
		<Dropdown menu={{ items }} placement='bottom'>
			<DotesIcon style={{ cursor: 'pointer' }} />
		</Dropdown>
	);

	return (
		<List.Item
			actions={[isHover && hoverExtraContent]}
			extra={<div style={extraItemStyle}>{list.reminders.length}</div>}
			style={{ ...listItemStyle, backgroundColor: isHover ? '#E9E9E9' : '' }}
			onDoubleClick={onEdit}
			{...hoverProps}
		>
			<Flex
				gap='10px'
				align='center'
				justify='space-between'
				style={{ width: '85%' }}
			>
				<Flex align='center' gap='10px'>
					<Avatar
						icon={mapListToIcon[list.icon]}
						style={{ backgroundColor: list.color }}
					/>
					{isEdit ? (
						<Input
							style={{ width: '78%' }}
							ref={inputRef}
							onBlur={onBlurInput}
							value={value}
							onChange={onChangeInput}
							suffix={<EnterOutlined />}
							size='small'
							onPressEnter={onSave}
							autoFocus
						/>
					) : (
						<div>{list.name}</div>
					)}
				</Flex>
			</Flex>
		</List.Item>
	);
};

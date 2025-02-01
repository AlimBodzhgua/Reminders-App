import { RadioChangeEvent } from 'antd';
import { IconPopover } from 'components/IconPicker/IconPopover';
import { mapListToIcon } from 'constants/iconsList';
import { useAppDispatch } from 'hooks/redux';
import { useHover } from 'hooks/useHover';
import { FC, memo, useCallback, useState } from 'react';
import { updateList } from 'store/actions/userActions';
import { StyledAvatar } from 'styled/Avatar.styles';
import { IList } from 'types/list';

interface ListAvatarProps {
	list: IList;
	isActive?: boolean;
}

export const ListAvatar: FC<ListAvatarProps> = memo((props) => {
	const { list, isActive } = props;
	const dispatch = useAppDispatch();
	const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
	const [isAvatarLoading, setIsAvatarLoading] = useState<boolean>(false);
	const { isHover, hoverProps } = useHover();

	const onTogglePopoverOpen = useCallback(() => {
		setIsPopoverOpen((prev) => !prev);
	}, []);

	const onChangeIcon = useCallback(async(e: RadioChangeEvent) => {
		setIsAvatarLoading(true);

		await dispatch(updateList({ _id: list._id, icon: e.target.value }));

		setIsAvatarLoading(false);
		setIsPopoverOpen(false);
	}, [dispatch, list]);

	return (
		<IconPopover
			isOpen={isPopoverOpen && list._isMutable}
			onIconChange={onChangeIcon}
			onOpenChange={onTogglePopoverOpen}
		>
			<StyledAvatar
				icon={mapListToIcon[list.icon]}
				$isHover={isHover}
				$bgColor={isActive ? '#fff' : list.color}
				$color={isActive ? list.color : '#fff'}
				$isLoading={isAvatarLoading}
				{...hoverProps}
			/>
		</IconPopover>
	);
});
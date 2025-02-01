import { FC, memo, useCallback, useState } from 'react';
import { RadioChangeEvent } from 'antd';
import { mapListToIcon } from 'constants/iconsList';
import { StyledButton } from 'styled/Button.styles';
import type { ColorType } from 'constants/colorList';
import type { ListsIconType } from 'types/list';
import { IconPopover } from './IconPopover';

interface IconPickerColor {
	color: ColorType;
	icon: ListsIconType;
	onChange: (icon: ListsIconType) => void;
}

export const IconPicker: FC<IconPickerColor> = memo((props) => {
	const {
		color,
		icon,
		onChange,
	} = props;
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const onToggleShow = useCallback(() => {
		setIsOpen(prev => !prev);
	}, []);

	const onChangeIcon = (e: RadioChangeEvent) => {
		onChange(e.target.value);
		setIsOpen(false);
	};


	return (
		<IconPopover
			isOpen={isOpen}
			onOpenChange={onToggleShow}
			onIconChange={onChangeIcon}
			placement='right'
		>
			<StyledButton
				size='large'
				shape='circle'
				icon={mapListToIcon[icon as ListsIconType]}
				data-testid='icon-picker'
				$bgColor={color}
				$color='white'
				$hoverBgColor={color}
			/>
		</IconPopover>
	);
});
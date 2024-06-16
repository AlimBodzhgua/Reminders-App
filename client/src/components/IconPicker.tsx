import { FC, memo, useCallback, useState } from 'react';
import { Flex, Popover, Radio, RadioChangeEvent } from 'antd';
import { mapListToIcon } from 'constants/iconsList';
import { ListsIconType } from 'types/list';
import { StyledButton } from 'styled/Button.styles';

interface IconPickerColor {
	color: string;
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

	const renderIconslist = useCallback(() => (
		Object.keys(mapListToIcon).map((icon, index) => (
			<Radio.Button
				key={index}
				value={icon}
			>
				{mapListToIcon[icon as ListsIconType]}
			</Radio.Button>
		))
	), [mapListToIcon, color]);


	const content = (
		<Radio.Group
			size='small'
			onChange={onChangeIcon}
		>
			<Flex wrap gap='small' style={{width: '145px'}}>
				{renderIconslist()}
			</Flex>
		</Radio.Group>
	);

	return (
		<Popover
			open={isOpen}
			content={content}
			onOpenChange={onToggleShow}
			trigger='click'
			placement='right'
		>
			<StyledButton
				size='large'
				shape='circle'
				icon={mapListToIcon[icon as ListsIconType]}
				$bgColor={color}
				$color='white'
				$hoverBgColor={color}
			/>
		</Popover>
	);
});
import { FC, ReactNode, useCallback } from 'react';
import { Flex, Popover, PopoverProps, Radio, RadioChangeEvent } from 'antd';
import { mapListToIcon } from 'constants/iconsList';
import { ListsIconType } from 'types/list';
import { TooltipPlacement } from 'antd/es/tooltip';

interface IconPopoverProps {
	children: ReactNode;
	isOpen: boolean;
	onOpenChange: () => void;
	onIconChange: (e: RadioChangeEvent) => void;
	placement?: TooltipPlacement;
}

export const IconPopover: FC<IconPopoverProps> = (props) => {
	const {
		children,
		isOpen,
		onOpenChange,
		onIconChange,
		placement = 'right',
		...otherProps
	} = props;

	const renderIconslist = useCallback(() => (
		Object.keys(mapListToIcon).map((icon, index) => (
			<Radio.Button key={index} value={icon}>
				{mapListToIcon[icon as ListsIconType]}
			</Radio.Button>
		))
	), [mapListToIcon]);

	const content = (
		<Radio.Group
			size='small'
			onChange={onIconChange}
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
			onOpenChange={onOpenChange}
			trigger='click'
			placement={placement}
			{...otherProps}
		>
			{children}
		</Popover>
	)
}
import { FC, memo, MouseEvent } from 'react';
import { Flex, Space, Dropdown } from 'antd';
import { ListSortSelector } from 'components/ListSortSelector/ListSortSelector';
import { StyledButton } from 'styled/Button.styles';

import {
	DoteDivider,
	StyledTitle,
} from './ListHeader.styles';

interface ListHeaderProps {
	title: string;
	amount: number;
	completedNumber: number;
	color?: string;
	onClear?: () => void;
	onShow?: () => void;
}

export const ListHeader: FC<ListHeaderProps> = memo((props) => {
	const {
		title,
		amount,
		onClear,
		onShow,
		completedNumber,
		color = '#000',
	} = props;

	const onContentClick = (e: MouseEvent) => {
		e.stopPropagation();
	};

	const handleClear = () => {
		if (onClear) {
			onClear();			
		}
	};

	const handleShow = () => {
		if (onShow) {
			onShow();
		}
	};

	return (
		<Flex vertical gap={10} onClick={onContentClick}>
			<Flex justify='space-between' align='center'>
				<Space align='end'>
					<StyledTitle $color={color}>
						{title}
					</StyledTitle>
				</Space>
				<StyledTitle $color={color} $weight={500}>
					{amount}
				</StyledTitle>
			</Flex>
			<Flex justify='space-between' align='center'>
				<Space>
					<StyledTitle level={5}>
						{completedNumber} Completed
					</StyledTitle>
					<DoteDivider />
					<StyledButton
						onClick={handleClear}
						type='text'
						size='small'
						$color={color}
						$weight={800}
					>
						Clear
					</StyledButton>
				</Space>
				<ListSortSelector />
				{/*<StyledButton
					type='text'
					size='small'
					$color={color}
					$weight={800}
					onClick={handleShow}
				>
					Show
				</StyledButton>*/}
			</Flex>
		</Flex>
	);
});



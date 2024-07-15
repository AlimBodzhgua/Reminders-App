import { FC, memo, MouseEvent } from 'react';
import { Flex, Space } from 'antd';
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
}

export const ListHeader: FC<ListHeaderProps> = memo((props) => {
	const {
		title,
		amount,
		onClear,
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
			</Flex>
		</Flex>
	);
});



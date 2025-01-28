import { Typography, Card, List, Input } from 'antd';
import styled from 'styled-components';

interface StyledListItemProps {
	$opacity: number;
}

export const StyledListItem = styled(List.Item)<StyledListItemProps>`
	transition: opacity .2s linear;
	opacity: ${props => props.$opacity};

	&&& {
		padding: 2px 0;
		border-block-end: none;
	}
`;

interface StyledCardProps {
	$bgColor: string;
}

export const StyledCard = styled(Card)<StyledCardProps>`
	width: 100%;
	background-color: ${props => props.$bgColor};
	transition: background-color .3s linear;
`;

interface StyledTitleProps {
	$isActive?: boolean;
	$weight?: number;
	$margin?: string;
	$align?: 'left' | 'right' | 'center';
}

export const StyledTitle = styled(Typography.Title)<StyledTitleProps>`
	&&& {
		color: ${props => props.$isActive ?  '#fff' : '#515151'};
		font-weight: ${props => props.$weight || 700};
		text-align: ${props => props.$align || 'center'};
		margin: ${props => props.$margin};
		transition: color .3s;
	}
`;

export const StyledInput = styled(Input)`
	margin-top: 6px;
	padding: 0;
	border-bottom: 1px solid #e5e5e5;
	border-radius: 0;
	color: #fff;
	font-size: 15px;
`;
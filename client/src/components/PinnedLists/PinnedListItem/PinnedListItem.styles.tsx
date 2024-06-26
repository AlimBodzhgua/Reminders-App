import { Typography, Card, List, Input } from 'antd';
import styled from 'styled-components';

export const StyledListItem = styled(List.Item)`
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
	padding: 0 2px;
	border-radius: 0;
	border: none;
`;
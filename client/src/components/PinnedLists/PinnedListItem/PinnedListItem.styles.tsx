import { Typography, Card, List } from 'antd';
import styled from 'styled-components';

export const StyledListItem = styled(List.Item)`
	&&& {
		width: 49%;
		padding: 4px 0;
	}
`

interface StyledCardProps {
	backgroundColor: string;
}

export const StyledCard = styled(Card)<StyledCardProps>`
	width: 100%;
	background-color: ${props => props.backgroundColor};
	transition: background-color .3s linear;
`

interface StyledTitleProps {
	isActive?: boolean;
	weight?: number;
	margin?: string;
	align?: 'left' | 'right' | 'center';
}

export const StyledTitle = styled(Typography.Title)<StyledTitleProps>`
	&&& {
		color: ${props => props.isActive ?  '#fff' : '#515151'};
		font-weight: ${props => props.weight || 700};
		text-align: ${props => props.align || 'center'};
		margin: ${props => props.margin};
		transition: color .3s;
	}
`
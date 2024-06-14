import { Checkbox, Typography, List } from 'antd';
import { baseCheckbox } from 'styled/mixins';
import { InfoCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

interface StyledListItemProps {
	$isLoading?: boolean;
}

export const StyledListItem = styled(List.Item)<StyledListItemProps>`
	opacity: ${props => props.$isLoading ? '0.5' : '1'};
	transition: opacity .2s;
	width: 100%;
`;

interface StyledTitleProps {
	$color?: string;
}

export const StyledTitle = styled(Typography.Title)<StyledTitleProps>`
	&&& {
		margin: 0;
		color: ${props => props.$color || '#000'};
	}
`;

interface StyledTextProps {
	$color?: string;
}

export const StyledText = styled(Typography.Text)<StyledTextProps>`
	&&& {
		color: ${props => props.$color || '#949090'};
		font-size: 16px;
	}
`;

export const StyledLink = styled(Typography.Link)`
	background-color: #F4F4F4;
	border-radius: 8px;
	padding: 6px 10px;
	margin: 5px 0;
	width: fit-content;
	display: flex;
	gap: 8px;
	color: #949090!important;
`

interface StyledCheckboxProps {
	$color?: string;
}

export const StyledCheckbox = styled(Checkbox)<StyledCheckboxProps>`
	${baseCheckbox};
	margin-top: 5px;
	border-color: ${props => props.$color};
	
	.ant-checkbox-inner::after {
		background-color: ${props => props.$color};
	}
`;

interface InfoCircleOutlinedProps {
	$color?: string;
}

export const StyledInfoCircleOutlined = styled(InfoCircleOutlined)<InfoCircleOutlinedProps>`
	color: ${props => props.$color};
	font-size: 18px;
	cursor: pointer;
`
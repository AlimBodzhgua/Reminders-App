import { Checkbox, Typography, List } from 'antd';
import { baseCheckbox } from 'styled/mixins';
import styled from 'styled-components';

interface StyledListItemProps {
	$isLoading?: boolean;
}


export const StyledListItem = styled(List.Item)<StyledListItemProps>`
	opacity: ${props => props.$isLoading ? '0.5' : '1'};
	transition: opacity .2s;
`;

export const StyledTitle = styled(Typography.Title)`
	&&& {
		margin: 0;
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
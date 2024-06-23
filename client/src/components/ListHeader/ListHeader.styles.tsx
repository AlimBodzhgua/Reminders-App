import { Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

export const DoteDivider = styled.div`
	width: 3px;
	height: 3px;
	display: block;
	background-color: #000;
	border-radius: 50%;
`;

export const StyledPlusOutlined = styled(PlusOutlined)`
	color: #000;
	font-size: 22px!important;
`;

interface StyledTitleProps {
	$color?: string;
	$weight?: number;
}

export const StyledTitle = styled(Typography.Title)<StyledTitleProps>`
	&&& {
		margin-bottom: 0;
		color: ${props => props.$color || '#949090'};
	}
`;

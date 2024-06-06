import { Layout, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

export const StyledContent = styled(Layout.Content)`
	padding: 15px 30px;
	color: #fff;
	background-color: #ffff;
`

export const StyledPlusOutlined = styled(PlusOutlined)`
	color: #000;
	font-size: 28px!important;
`

interface StyledTitleProps {
	$color?: string;
	$weight?: number;
}

export const StyledTitle = styled(Typography.Title)<StyledTitleProps>`
	&&& {
		font-weight: ${props => props.$weight || 700};
		color: ${props => props.$color};
	}
`
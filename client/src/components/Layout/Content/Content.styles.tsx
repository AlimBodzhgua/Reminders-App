import { Layout, Typography } from 'antd';
import { PlusOutlined, LockFilled } from '@ant-design/icons';
import styled from 'styled-components';

interface StyledContentProps {
	$thumbColor?: string;
}

export const StyledContent = styled(Layout.Content)<StyledContentProps>`
	padding: 15px 30px 45px;
	color: #fff;
	background-color: #ffff;
	overflow-y: auto;
	height: calc(100vh - 65px);

	&::-webkit-scrollbar-thumb {
		border-radius: 5px;
		background-color: ${props => props.$thumbColor}!important;
	}
`;

export const StyledPlusOutlined = styled(PlusOutlined)`
	color: #000;
	font-size: 28px!important;
`;

export const StyledLockFilled = styled(LockFilled)`
	color: #ffc069;
	font-size: 42px;
`

interface StyledTitleProps {
	$color?: string;
	$weight?: number;
}

export const StyledTitle = styled(Typography.Title)<StyledTitleProps>`
	&&& {
		font-weight: ${props => props.$weight || 700};
		color: ${props => props.$color};
		margin: 0;
	}
`;

export const StyledSubtitle = styled(Typography.Title)<StyledTitleProps>`
	&&& {
		font-weight: ${props => props.$weight || 700};
		color: ${props => props.$color};
		max-width: 430px;
		text-align: center;
		margin: 0;
	}
`;
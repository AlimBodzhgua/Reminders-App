import { List, Input, Skeleton } from 'antd';
import { DashOutlined } from '@ant-design/icons';
import styled from 'styled-components';

interface StyledListItemProps {
	$bgColor?: string;
	$opacity?: number;
}

export const StyledListItem = styled(List.Item)<StyledListItemProps>`
	padding: 8px 12px;
	border-radius: 8px;
	color: #515151;
	background-color: ${props => props.$bgColor};

	opacity: ${props => props.$opacity};
	
	transition:
		background-color .3s linear,
		opacity .2s linear;

	&&& {
		border-block-end: none;
	}

	&:hover {
		background-color: #E9E9E9;
	}

`;

export const StyledExtraItem = styled.div`
	font-weight: 600;
	font-size: 18px;
	color: #8c8c8c;
	line-height: 1.4;
`;

interface StyledNameProps {
	$color?: string;
}

export const StyledName = styled.div<StyledNameProps>`
	color: ${props => props.$color};
	
	&:hover {
		cursor: text;
	}
`;

export const StyledInput = styled(Input)`
	max-width: 70%;
	padding: 0;
	border-radius: 0;
	border-bottom: 1px solid #bcbcbc;
`;

export const StyledDashOutlined = styled(DashOutlined)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 100;
`

export const StyledSkeleton = styled(Skeleton)`

	.ant-skeleton-avatar {
		width: 30px!important;
		height: 30px!important;
	}
`
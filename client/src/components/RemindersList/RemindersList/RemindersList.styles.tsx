import { Typography } from 'antd';
import styled from 'styled-components';

export const DoteDivider = styled.div`
	width: 3px;
	height: 3px;
	display: block;
	background-color: #000;
	border-radius: 50%;
`;

export const StyledTitle = styled(Typography.Title)`
	&&& {
		margin-bottom: 0;
		color: #949090;
	}
`;
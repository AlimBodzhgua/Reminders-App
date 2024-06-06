import { List } from 'antd';
import styled from 'styled-components';

interface StyledListItemProps {
	bgColor: string
}

export const StyledListItem = styled(List.Item)<StyledListItemProps>`
	padding: 8px 12px;
	border-radius: 8px;
	color: #515151;
	background-color: ${props => props.bgColor};
`

export const StyledExtraItem = styled.div`
	font-weight: 600;
	font-size: 18px;
	color: #8c8c8c;
	line-height: 1.4;
`
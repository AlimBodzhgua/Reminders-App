import { Button } from 'antd';
import styled from 'styled-components';

interface StyledButtonProps {
	backgroundColor?: string;
	color?: string;
}

export const StyledButton = styled(Button)<StyledButtonProps>`
	background-color: ${props => props.backgroundColor};
	color: ${props => props.color};
`
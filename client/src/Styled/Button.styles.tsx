import { Button } from 'antd';
import styled from 'styled-components';

interface StyledButtonProps {
	$bgColor?: string;
	$color?: string;
}

export const StyledButton = styled(Button)<StyledButtonProps>`
	background-color: ${props => props.$bgColor};
	color: ${props => props.$color};
`;
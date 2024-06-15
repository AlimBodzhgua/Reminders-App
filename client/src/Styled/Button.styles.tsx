import { Button } from 'antd';
import styled from 'styled-components';

interface StyledButtonProps {
	$bgColor?: string;
	$color?: string;
	$weight?: number;
	$hoverBgColor?: string;
	$borderColor?: string;
}

export const StyledButton = styled(Button)<StyledButtonProps>`
	&&& {
		background-color: ${props => props.$bgColor};
		color: ${props => props.$color};
		border-color: ${props => props.$borderColor};
		font-weight: ${props => props.$weight};
	}

	span {
		font-weight: inherit;
	}

	&&&:hover {
		color: ${props => props.$color};
		background-color: ${props => props.$hoverBgColor};
	}
`;
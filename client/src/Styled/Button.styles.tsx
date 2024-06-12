import { Button } from 'antd';
import styled from 'styled-components';

interface StyledButtonProps {
	$bgColor?: string;
	$color?: string;
	$weight?: number;
	$hoverBgColor?: string;
}

export const StyledButton = styled(Button)<StyledButtonProps>`
	&&& {
		background-color: ${props => props.$bgColor};
		color: ${props => props.$color};
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
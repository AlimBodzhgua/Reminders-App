import DotesIcon from 'assets/icons/dotes.svg';
import styled from 'styled-components';

interface StyledDotesIconProps {
	$color?: string;
}

export const StyledDotesIcon = styled(DotesIcon)<StyledDotesIconProps>`
	color: ${props => props.$color || '#1677ff'};

	&:hover {
		cursor: pointer;
	}
`;
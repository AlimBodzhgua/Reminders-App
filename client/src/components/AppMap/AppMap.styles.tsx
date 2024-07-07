import styled from 'styled-components';
import { Spin } from 'antd';

interface StyledMapContainerProps {
	$width?: string;
	$height?: string;
}

export const StyledMapContainer = styled.div<StyledMapContainerProps>`
	width: ${props => props.$width || '295px'};
	height: ${props => props.$height || '230px'};
`;

export const StyledSpin = styled(Spin)`
	position: absolute;
`;

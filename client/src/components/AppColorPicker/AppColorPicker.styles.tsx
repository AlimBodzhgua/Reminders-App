import { Radio } from 'antd';
import styled from 'styled-components';

interface StyledRadioButtonProps {
	$color: string;
	$bgColor: string;
}

export const StyledRadioButton = styled(Radio.Button)<StyledRadioButtonProps>`
	&&& {
		color: ${props => props.$color};
		background-color: ${props => props.$bgColor};
		font-size: 2px;
	}
`

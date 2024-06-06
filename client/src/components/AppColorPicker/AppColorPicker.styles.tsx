import { Radio } from 'antd';
import styled from 'styled-components';

interface StyledRadioButtonProps {
	color: string;
	backgroundColor: string;
}

export const StyledRadioButton = styled(Radio.Button)<StyledRadioButtonProps>`
	&&& {
		color: ${props => props.color};
		background-color: ${props => props.backgroundColor};
		font-size: 2px;
	}
`

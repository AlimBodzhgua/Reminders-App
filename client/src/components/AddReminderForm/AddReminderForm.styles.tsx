import {
	DatePicker,
	TimePicker,
	Checkbox,
	Flex,
	Form,
	Button,
} from 'antd';
import { basePicker, baseCheckbox } from 'styled/mixins';
import styled, { IStyledComponent } from 'styled-components';

import type { FormProps, DatePickerProps } from 'antd';

export const StyledForm: IStyledComponent<'web', FormProps> = styled(Form)`
	& .ant-form-item  {
		margin-bottom: 5px;
	}
`;

export const StyledDatePicker: IStyledComponent<'web', DatePickerProps> = styled(DatePicker)`
	${basePicker};

	border-radius: 0;
	width: 140px;
`;

export const StyledTimePicker = styled(TimePicker)`
	${basePicker};

	border-radius: 0;
	width: 106px;
`;

export const StyledFlex = styled(Flex)`
	border-bottom: 2px solid #CFCFCF;
	width: 100%;
	padding: 4px 0 2px;
`;

interface StyledCheckboxProps {
	$color?: string;
}

export const StyledCheckbox = styled(Checkbox)<StyledCheckboxProps>`
	${baseCheckbox};
	margin-top: 10px;
	margin-right: 10px;
	border-color: ${props => props.$color};

	.ant-checkbox-inner::after {
		background-color: ${props => props.$color};
	}
`;

interface StyledButtonProps {
	$color?: string;
}

export const StyledButton = styled(Button)<StyledButtonProps>`
	background: rgb(0 0 0 / 4%);
	border-radius: 0;
	height: 30px;
	margin-bottom: 5px;
	color: ${props => props.$color || '#949090'};
	border-color: rgb(0 0 0 / 4%);
`;
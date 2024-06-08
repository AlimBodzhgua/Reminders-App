import {
	DatePicker,
	TimePicker,
	DatePickerProps,
	Checkbox,
	Flex,
} from 'antd';
import styled, { IStyledComponent, css } from 'styled-components';

const modifiedPickerStyles = css`
	& .ant-picker-input {
		display: flex;
		flex-direction: row-reverse;
		gap: 8px;
	}

	& .ant-picker-clear {
		opacity: 1;
	}

	& .ant-picker-suffix {
		opacity: 1;
	}

	& .ant-picker-suffix:hover {
		opacity: 1;
	}
`;

export const StyledDatePicker: IStyledComponent<'web', DatePickerProps> = styled(DatePicker)`
	border-radius: 0;
	width: 144px;

	${modifiedPickerStyles}
`;

export const StyledTimePicker = styled(TimePicker)`
	border-radius: 0;
	width: 144px;

	${modifiedPickerStyles}
`;

export const StyledFlex = styled(Flex)`
	border-bottom: 2px solid #CFCFCF;
	width: 100%;
	padding: 4px 0 8px;
`;

export const StyledCheckbox = styled(Checkbox)`
	transform: scale(1.6);
	margin-top: 10px;
	margin-right: 10px;

	& .ant-checkbox-inner {
		border-radius: 50%;
	}
`;
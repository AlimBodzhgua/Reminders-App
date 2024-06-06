import { Form, DatePicker, TimePicker, DatePickerProps } from 'antd';
import styled, { IStyledComponent, css } from 'styled-components';

export const StyledForm = styled(Form)`
	border-bottom: 2px solid #CFCFCF;
	padding: 4px 0 8px;
`

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
`

export const StyledDatePicker: IStyledComponent<'web', DatePickerProps> = styled(DatePicker)`
	border-radius: 0;
	width: 144px;

	${modifiedPickerStyles}
`

export const StyledTimePicker = styled(TimePicker)`
	border-radius: 0;
	width: 144px;

	${modifiedPickerStyles}
`

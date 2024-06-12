import { css } from 'styled-components';

export const baseCheckbox = css`
	position: relative;
	border: 3px solid;
	border-radius: 50%;

	& .ant-checkbox-inner {
		border-radius: 50%;
		width: 24px;
		height: 24px;

		background-color: white;
		border-color: white;
	}

	& .ant-checkbox-inner:after {
	    position: absolute;
	    left: 0;
	    right: 0;
	    top: 0;
	    bottom: 0;
	    margin: auto;

		width: 19px;
		height: 19px;
		border-radius: 50%;
		border: none;
		transform: none;
	}

	&&& .ant-checkbox-input:focus + .ant-checkbox-inner {
		border-color: white;
	}

	&&& .ant-checkbox:hover .ant-checkbox-inner {
		border-color: white;
		background-color: white;
	}
`;

export const basePicker = css`
	& .ant-picker-input {
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		gap: 8px;
	}

	& .ant-picker-input > input {
		font-size: 13px;
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
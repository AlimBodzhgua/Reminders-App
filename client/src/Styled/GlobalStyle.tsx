import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`	
	*,
	*::after,
	*::before {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		font-family: Lato, sans-serif;
		font-weight: 600;
	}

	*::-webkit-scrollbar {
		height: 8px;
		width: 6px;
	}
	
	*::-webkit-scrollbar-track {
		border-radius: 5px;
		background-color: #DFE9EB;
	}

	*::-webkit-scrollbar-track:hover {
		background-color: #d0dfe2;
	}

	*::-webkit-scrollbar-track:active {
		background-color: #d0dfe2;
	}

	*::-webkit-scrollbar-thumb {
		border-radius: 5px;
		background-color: #1677FF;
	}

	*::-webkit-scrollbar-thumb:hover {
		background-color: #084AFF;
	}

	*::-webkit-scrollbar-thumb:active {
		background-color: #050EFF;
	}
`;

export default GlobalStyle;
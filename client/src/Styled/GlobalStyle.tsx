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
`;

export default GlobalStyle;
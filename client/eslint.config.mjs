import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import tsParser from '@typescript-eslint/parser';


export default [
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		languageOptions: {
			globals: globals.browser,
			parser: tsParser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				ecmaVersion: 'latest',
				sourceType: 'module'
			},
		},
		plugins: {
			react,
		},
		rules: {
			'linebreak-style': 'off',
			'no-console': 'warn',
			'no-tabs': 'off',
			'no-undef': 'off',
			'no-unused-vars': 'off',
			'no-shadow': 'off',
			'no-underscore-dangle': 'off',
			'no-mixed-spaces-and-tabs': 'off',
			'no-restricted-globals': 'warn',
			'no-param-reassign': ['error', { 'props': false }],
			'semi': ['warn', 'always'],
			'prefer-const': 'warn',
			'quotes': ['warn', 'single'],
			'jsx-quotes': ['warn', 'prefer-single'],
			'array-callback-return': 'off',
			'consistent-return': 'warn',
			'react/jsx-indent': ['error', 'tab'],
			'react/jsx-indent-props': ['error', 'tab'],
			'react/jsx-max-props-per-line': ['warn', { maximum: 3 }],
			'react/prop-types': 'off',
			'indent': ['error', 'tab', { 'SwitchCase': 1 }],
			'react/jsx-filename-extension': [
				2, 
				{extensions: ['.js', '.jsx', '.tsx']}
			],
			'import/no-extraneous-dependencies': 'off',
			'import/prefer-default-export': 'off',
			'import/no-unresolved': 'off',
			'import/extensions': 'off',
			'react/function-component-definition': 'off',
			'react/jsx-props-no-spreading': 'off',
			'react/require-default-props': 'off',
			'react/react-in-jsx-scope': 'off',
			'react/button-has-type': 'off',
			'react/jsx-wrap-multilines': 'off',
			'max-len': [
				'error',
				{
					code: 110,
					ignoreComments: true
				}
			],
			'object-curly-newline': 'off',
			'react/jsx-one-expression-per-line': 'off',
		},
	},
];
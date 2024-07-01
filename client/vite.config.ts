import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
	build: {
		outDir: './build',
	},
	plugins: [
		react(),
		tsconfigPaths(),
		checker({
			typescript: true,
		}),
		svgr({
			include: '**/*.svg',
			svgrOptions: {
				exportType: 'default',
		    },
	    })
	],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/lib/tests/setupTests.ts'],
	}
});
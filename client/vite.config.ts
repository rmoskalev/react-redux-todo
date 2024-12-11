import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const alias = (
	tag: string,
	path: string,
): {
	find: string;
	replacement: string;
} => ({
	find: tag,
	replacement: resolve(__dirname, path),
});

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			alias('@app', 'src/app'),
			alias('@pages', 'src/pages'),
			alias('@widgets', 'src/widgets'),
			alias('@features', 'src/features'),
			alias('@entities', 'src/entities'),
			alias('@shared', 'src/shared'),

			alias('@hooks', 'src/shared/hooks'),
			alias('@utils', 'src/shared/utils'),
			alias('@types', 'src/shared/types'),

			alias('@', 'src'),
		],
	},
});

import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false,
			strict: false
		}),
		paths: {
			base: '/forsyth-os.github.io',
		},
		prerender: {
			handleHttpError: ({ status, path, referrer, referenceType }) => {
				// Ignore 404s on assets and other non-critical paths
				if (status === 404 && (path.startsWith('/assets') || path.startsWith('/forsyth-os.github.io/assets'))) {
					return;
				}
				// For other 404s, log but don't fail the build
				if (status === 404) {
					console.warn(`404 error during prerender: ${path}`);
					return;
				}
				throw new Error(`${status} ${path}`);
			}
		}
	}
};

export default config;

// Enable prerendering for all pages
export const prerender = true;

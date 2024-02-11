import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-satoshi)', ...defaultTheme.fontFamily.sans]
			},
			transitionTimingFunction: {
				'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
				'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)'
			}
		}
	},
	plugins: []
};
export default config;

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{ hostname: 'www.google.com' },
			{ hostname: 't0.gstatic.com' },
			{ hostname: 'i.ibb.co' }
		]
	},
	i18n: {
		locales: ['es-ES', 'en-US'],
		defaultLocale: 'en-US'
	}
};

export default nextConfig;

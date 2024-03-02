/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{ hostname: 'www.google.com' },
			{ hostname: 't0.gstatic.com' },
			{ hostname: 'i.ibb.co' }
		]
	}
};

export default nextConfig;

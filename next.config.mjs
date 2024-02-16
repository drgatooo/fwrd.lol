/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [{ hostname: 'www.google.com' }, { hostname: 't0.gstatic.com' }]
	}
};

export default nextConfig;

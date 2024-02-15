import type { NextRequest } from 'next/server';
import { handleRateLimit } from '@/middleware/rateLimit';

export const middleware = async (req: NextRequest) => {
	await handleRateLimit(req);
};

export const config = {
	matcher: '/api/:path*'
};

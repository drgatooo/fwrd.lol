import { type NextRequest, NextResponse } from 'next/server';
import { handleRateLimit } from '@/middleware/rateLimit';

export const middleware = async (req: NextRequest) => {
	const rateLimit = await handleRateLimit(req);
	return rateLimit || NextResponse.next();
};

export const config = {
	matcher: '/api/((?!auth).*)'
};

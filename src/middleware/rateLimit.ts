import { type NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

const rateLimit = new Ratelimit({
	redis: kv,
	limiter: Ratelimit.slidingWindow(2, '10s')
});

export async function handleRateLimit(req: NextRequest) {
	const forwarded = req.headers.get('x-forwarded-for');
	const [ip] = forwarded?.split(/, /) ?? ['127.0.0.1'];
	console.log(ip);

	const { limit, reset, remaining } = await rateLimit.limit(ip, { geo: req.geo });
	console.log({ limit, reset, remaining });

	if (remaining < 1) {
		return Response.json(
			{ message: 'Rate limit exceeded' },
			{
				status: 429,
				headers: {
					'Content-Type': 'application/json',
					'X-RateLimit-Limit': limit.toString(),
					'X-RateLimit-Remaining': remaining.toString(),
					'X-RateLimit-Reset': reset.toString()
				}
			}
		);
	}

	return NextResponse.next();
}

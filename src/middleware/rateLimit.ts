import { type NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

const rateLimit = new Ratelimit({
	redis: kv,
	limiter: Ratelimit.slidingWindow(120, '60s')
});

export async function handleRateLimit(req: NextRequest) {
	const forwarded = req.headers.get('x-forwarded-for');
	const [ip] = forwarded?.split(/, /) ?? ['127.0.0.1'];
	console.log(ip);

	const { limit, reset, remaining } = await rateLimit.limit(ip);
	console.log({ limit, reset, remaining, geo: req.geo });

	if (remaining < 1) {
		const seconds = Math.ceil((reset - Date.now()) / 1000);

		return NextResponse.json(
			{
				message: `Estás siendo limitado. Intenta en ${seconds} segundos.`
			},
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

	return false;
}

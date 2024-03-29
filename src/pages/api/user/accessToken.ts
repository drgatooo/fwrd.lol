import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticate } from '@/lib/auth/api';
import { generateKeySync } from 'crypto';
import prisma from '@/lib/prisma';

interface Data {
	message: string;
	token?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const user = await authenticate({ req, res });
	if (!user) return void 0;

	const token = req.headers.authorization;

	if (token) {
		return res.status(405).json({ message: 'Method Not Allowed' });
	}

	// request a new access token
	if (req.method === 'POST') {
		const token = generateKeySync('hmac', { length: 128 });

		await prisma.accessToken.deleteMany({
			where: { userId: user.id }
		});

		const accessToken = await prisma.accessToken.create({
			data: {
				accessToken: token.export().toString('hex'),
				user: {
					connect: { id: user.id }
				},
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 120)
			}
		});

		return res
			.status(200)
			.json({ message: 'Token generado correctamente.', token: accessToken.accessToken });
	}

	return res.status(405).json({ message: 'Method Not Allowed' });
}

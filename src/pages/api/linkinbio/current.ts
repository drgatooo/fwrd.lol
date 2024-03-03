import type { NextApiRequest, NextApiResponse } from 'next';
import type { LinkInBio } from '@prisma/client';
import { authenticate } from '@/lib/auth/api';
import prisma from '@/lib/prisma';

interface Data {
	message: string;
	config?: LinkInBio;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method Not Allowed' });
	}

	const user = await authenticate({ req, res });
	if (!user) return void 0;

	const linkInBio = await prisma.linkInBio.upsert({
		where: { userId: user.id },
		create: { userId: user.id },
		update: {}
	});

	return res.status(200).json({ message: 'Enlaces encontrados', config: linkInBio });
}

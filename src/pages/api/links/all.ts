import type { NextApiRequest, NextApiResponse } from 'next';
import type { Link } from '@prisma/client';
import { authenticate } from '@/lib/auth/api';
import prisma from '@/lib/prisma';

interface Data {
	message: string;
	links?: Link[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method Not Allowed' });
	}

	const user = await authenticate({ req, res });
	if (!user) return void 0;

	const links = await prisma.link.findMany({
		where: { creatorId: user.id }
	});

	return res.status(200).json({ message: 'Enlaces encontrados', links });
}

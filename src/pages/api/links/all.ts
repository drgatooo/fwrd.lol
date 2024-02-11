import type { NextApiRequest, NextApiResponse } from 'next';
import type { Link } from '@prisma/client';
import { getUser } from '@/lib/auth/api';
import prisma from '@/lib/prisma';

interface Data {
	message: string;
	links?: Link[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method Not Allowed' });
	}

	const token = req.headers.authorization;
	const user = await getUser({ req, res, token });

	if (!user) {
		return res.status(401).json({ message: 'No puedes realizar esta acción.' });
	}

	const links = await prisma.link.findMany({
		where: { creatorId: user.id }
	});

	return res.status(200).json({ message: 'Enlaces encontrados', links });
}

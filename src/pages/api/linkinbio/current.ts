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

	let linkInBio = await prisma.linkInBio.upsert({
		where: { userId: user.id },
		create: { userId: user.id, title: user.name },
		update: {}
	});

	if (!linkInBio.title) {
		linkInBio = await prisma.linkInBio.update({
			where: { userId: user.id },
			data: { title: user.name }
		});
	}

	if (!linkInBio.username) {
		let [initialUsername] = user.email.split('@');

		while (await prisma.linkInBio.findFirst({ where: { username: initialUsername } })) {
			initialUsername += Math.floor(Math.random() * 10);
		}

		linkInBio = await prisma.linkInBio.update({
			where: { userId: user.id },
			data: { title: user.name, username: user.email.split('@')[0] }
		});
	}

	return res.status(200).json({ message: 'Configuración actual', config: linkInBio });
}

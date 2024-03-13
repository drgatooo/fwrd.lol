import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticate, getUser } from '@/lib/auth/api';
import type { User } from '@prisma/client';
import prisma from '@/lib/prisma';

interface Data {
	message: string;
	user?: User;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const user = await authenticate({ req, res });
	if (!user) return void 0;

	if (req.method === 'PATCH') {
		const { name } = req.body;

		if (!name) {
			return res.status(400).json({ message: 'Faltan campos requeridos.' });
		}

		if (name == user.name) {
			return res.status(400).json({ message: 'El nombre es el mismo.' });
		}

		if (name.length < 3) {
			return res.status(400).json({ message: 'El nombre debe tener al menos 3 caracteres.' });
		}

		if (name.length > 100) {
			return res.status(400).json({ message: 'El nombre no debe tener más de 100 caracteres.' });
		}

		const updatedUser = await prisma.user.update({
			where: { id: user.id },
			data: { name }
		});

		return res
			.status(200)
			.json({ message: 'Usuario actualizado correctamente.', user: updatedUser });
	}

	if (req.method === 'DELETE') {
		const token = req.headers.authorization;
		if (token) {
			return res.status(405).json({ message: 'Method Not Allowed' });
		}

		await prisma.linkInBio.delete({ where: { userId: user.id } }).catch(() => void 0);
		await prisma.user.delete({ where: { id: user.id } });

		return res.status(200).json({ message: 'Usuario eliminado correctamente.' });
	}

	return res.status(405).json({ message: 'Method Not Allowed' });
}

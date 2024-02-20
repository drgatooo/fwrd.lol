import type { NextApiRequest, NextApiResponse } from 'next';
import type { User } from '@prisma/client';
import { getUser } from '@/lib/auth/api';
import prisma from '@/lib/prisma';

interface Data {
	message: string;
	user?: User;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method === 'PATCH') {
		const token = req.headers.authorization;
		const user = await getUser({ req, res, token });

		if (!user) {
			return res.status(401).json({ message: 'No puedes realizar esta acción.' });
		}

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
		const user = await getUser({ req, res, token });

		if (token && user) {
			return res.status(405).json({ message: 'Method Not Allowed' });
		}

		if (!user) {
			return res.status(401).json({ message: 'No puedes realizar esta acción.' });
		}

		await prisma.link.deleteMany({ where: { creatorId: user.id } });
		await prisma.accessToken.deleteMany({ where: { userId: user.id } });
		await prisma.account.deleteMany({ where: { userId: user.id } });
	}

	return res.status(405).json({ message: 'Method Not Allowed' });
}

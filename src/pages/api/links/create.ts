import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidSlug, isValidURL } from '@/utils/validators';
import { getUser } from '@/lib/auth/api';
import prisma from '@/lib/prisma';

interface Data {
	message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method Not Allowed' });
	}

	const token = req.headers.authorization;
	const { url, alias, description } = req.body;

	const user = await getUser({ req, res, token });

	if (!user) {
		return res.status(401).json({ message: 'No puedes realizar esta acción.' });
	}

	if (!isValidURL(url)) {
		return res.status(400).json({ message: 'La URL no es válida.' });
	}

	if (!isValidSlug(alias)) {
		return res.status(400).json({ message: 'El alias no es válido.' });
	}

	if (description && description.lengh >= 250) {
		return res
			.status(400)
			.json({ message: 'La descripción no puede tener más de 250 caracteres.' });
	}

	const existingSlug = await prisma.link.findUnique({
		where: { alias },
		select: { alias: true }
	});

	if (existingSlug) {
		return res.status(400).json({ message: 'El alias ya está en uso.' });
	}

	if (!user.premium) {
		const linksCount = await prisma.link.count({
			where: { creatorId: user.id }
		});

		if (linksCount >= 20) {
			return res.status(400).json({ message: 'Has alcanzado el límite de 20 enlaces.' });
		}
	}

	const link = await prisma.link.create({
		data: {
			url,
			alias,
			createdAt: new Date(),
			creatorId: user.id,
			description
		}
	});

	return res.status(201).json({ message: 'Enlace creado correctamente.' });
}

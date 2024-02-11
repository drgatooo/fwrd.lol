import type { NextApiRequest, NextApiResponse } from 'next';
import type { Link } from '@prisma/client';
import { getUser } from '@/lib/auth/api';
import { isValidURL } from '@/utils/validators';
import prisma from '@/lib/prisma';

interface Data {
	message: string;
	links?: Link[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const token = req.headers.authorization;
	const user = await getUser({ req, res, token });

	if (!user) {
		return res.status(401).json({ message: 'No puedes realizar esta acción.' });
	}

	const { alias } = req.query;

	if (req.method == 'PATCH') {
		const { url, description } = req.body;

		if (!alias) {
			return res.status(400).json({ message: 'Se necesita el alias del enlace a modificar.' });
		}

		const existingSlug = await prisma.link.findUnique({
			where: { alias: alias.toString() },
			select: { alias: true }
		});

		if (!existingSlug) {
			return res.status(404).json({ message: 'El enlace no existe.' });
		}

		if (!isValidURL(url)) {
			return res.status(400).json({ message: 'La URL no es válida.' });
		}

		if (description && description.lengh >= 250) {
			return res
				.status(400)
				.json({ message: 'La descripción no puede tener más de 250 caracteres.' });
		}

		await prisma.link.update({
			where: { alias: alias.toString() },
			data: {
				url,
				description
			}
		});

		return res.status(200).json({ message: 'Enlace actualizado' });
	}

	if (req.method == 'DELETE') {
		if (!alias) {
			return res.status(400).json({ message: 'Se necesita el alias del enlace a eliminar.' });
		}

		const existingSlug = await prisma.link.findUnique({
			where: { alias: alias.toString() },
			select: { alias: true }
		});

		if (!existingSlug) {
			return res.status(404).json({ message: 'El enlace no existe.' });
		}

		await prisma.link.delete({
			where: { alias: alias.toString() }
		});

		return res.status(200).json({ message: 'Enlace eliminado' });
	}

	return res.status(405).json({ message: 'Method Not Allowed' });
}

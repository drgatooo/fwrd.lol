import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticate } from '@/lib/auth/api';
import { convertToValidUsername } from '@/utils/validators';
import prisma from '@/lib/prisma';
import { uploadImage } from '@/utils';

interface Data {
	message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const user = await authenticate({ req, res });
	if (!user) return void 0;

	if (req.method !== 'PUT') {
		return res.status(405).json({ message: 'Method Not Allowed' });
	}

	const { title, description, footer, username, buttonRound, buttonStyle, palette } = req.body;
	let { image } = req.body;

	if (
		!title &&
		!description &&
		!footer &&
		!username &&
		!buttonRound &&
		!buttonStyle &&
		!palette &&
		!image
	) {
		return res.status(400).json({ message: 'No hay cambios detectados.' });
	}

	const previous = await prisma.linkInBio.findUnique({ where: { userId: user.id } });

	if (image && image !== previous?.image) {
		const [, type] = image.split(';')[0].split('/');
		if (!['png', 'jpeg', 'jpg', 'webp', 'gif'].includes(type)) {
			return res.status(400).json({ message: 'El tipo de archivo no es soportado.' });
		}

		const size = Buffer.byteLength(image, 'utf8');
		if (size > 3 * 1024 * 1024) {
			return res.status(400).json({ message: 'El archivo es demasiado grande.' });
		}

		const imgRes = await uploadImage(image).catch(() => null);

		if (!imgRes) {
			return res.status(500).json({ message: 'Error al subir la imagen.' });
		}

		image = imgRes;
	}

	if (username) {
		if (convertToValidUsername(username) !== username) {
			return res.status(400).json({ message: 'El nombre de usuario no es válido.' });
		}

		const exists = await prisma.linkInBio.findFirst({ where: { username } });

		if (exists && exists.userId !== user.id) {
			return res.status(400).json({ message: 'El nombre de usuario ya está en uso.' });
		}
	}

	const obj = { title, description, buttonRound, buttonStyle, palette, image, footer, username };
	const filtered = Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));

	await prisma.linkInBio.upsert({
		where: { userId: user.id },
		update: filtered,
		create: {
			userId: user.id,
			...filtered
		}
	});

	return res.status(200).json({ message: 'Link en bio actualizado correctamente.' });
}

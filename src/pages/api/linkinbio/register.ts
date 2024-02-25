import type { NextApiRequest, NextApiResponse } from 'next';
import { getUser } from '@/lib/auth/api';

interface Data {
	name: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method !== 'POST') {
		res.status(405).json({ name: 'Method Not Allowed' });
	}

	const token = req.headers.authorization;
	const user = await getUser({ req, res, token });

	if (!user) {
		return res.status(401).json({ message: 'No puedes realizar esta acción.' });
	}
}

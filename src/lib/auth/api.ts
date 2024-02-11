import type { ReqRes } from '@/types';
import { getSession } from '@/utils/auth';
import prisma from '../prisma';

interface GetUserParams extends ReqRes {
	token?: string;
}

export async function getUser({ token, req, res }: GetUserParams) {
	if (token) {
		const data = await prisma.accessToken.findUnique({
			where: { accessToken: token },
			select: {
				user: {
					select: { id: true, premium: true }
				}
			}
		});

		if (data?.user) return data.user;
	} else {
		const session = await getSession({ req, res });
		if (session?.user?.email) {
			const user = await prisma.user.findUnique({
				where: { email: session.user.email }
			});

			if (user) return user;
		}
	}

	return undefined;
}

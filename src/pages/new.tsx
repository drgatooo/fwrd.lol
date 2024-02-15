import { signIn, useSession } from 'next-auth/react';
import type { GetServerSideProps } from 'next';
import { Layout } from '@/components/layout';
import { RelatedLinks } from '@/components/utils';
import { Shortener } from '@/components/wizards';
import { UnableToCreateLink } from '@/components/errors';
import { getSession } from '@/utils/auth';
import prisma from '@/lib/prisma';

export default function New({ linkCount, isPremium }: NewProps) {
	useSession({ required: true, onUnauthenticated: () => signIn('google') });

	return (
		<Layout
			metadata={{
				title: 'Nuevo enlace',
				description: 'Crea un enlace corto para compartirlo con tus amigos.'
			}}
		>
			<h2 className={'mt-5'}>Nuevo enlace</h2>
			<RelatedLinks />
			{linkCount >= 20 && !isPremium ? (
				<UnableToCreateLink />
			) : (
				<Shortener isPremium={isPremium} linkCount={linkCount} />
			)}
		</Layout>
	);
}

export const getServerSideProps = (async ({ req, res }) => {
	const session = await getSession({ req, res });

	if (!session?.user) {
		return { props: { isPremium: false, linkCount: 0 } };
	}

	const user = await prisma.user.findUnique({
		where: { email: session.user.email! },
		select: { links: { select: { alias: true } }, premium: true }
	});

	return {
		props: {
			linkCount: user?.links.length ?? 0,
			isPremium: user?.premium ?? false
		}
	};
}) satisfies GetServerSideProps<NewProps>;

interface NewProps {
	linkCount: number;
	isPremium: boolean;
}

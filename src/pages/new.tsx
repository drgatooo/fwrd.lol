import type { GetServerSideProps } from 'next';
import { Layout } from '@/components/layout';
import { LinkCreator } from '@/components/editors';
import { RelatedLinks } from '@/components/utils';
import { UnableToCreateLink } from '@/components/errors';
import { getSession } from '@/utils/auth';
import prisma from '@/lib/prisma';

export default function NewPage({ linkCount, isPremium }: NewProps) {
	return (
		<Layout
			restricted
			metadata={{
				title: 'Nuevo enlace',
				description: 'Crea un enlace corto para compartirlo con tus amigos.'
			}}
		>
			<h2 className={'mt-5'}>Nuevo enlace</h2>
			<RelatedLinks />
			{linkCount >= 30 && !isPremium ? (
				<UnableToCreateLink />
			) : (
				<LinkCreator isPremium={isPremium} linkCount={linkCount} />
			)}
		</Layout>
	);
}

export const getServerSideProps = (async ({ req, res }) => {
	const session = await getSession({ req, res });

	if (!session?.user) {
		return { redirect: { destination: '/' } };
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
}) as GetServerSideProps<NewProps>;

interface NewProps {
	linkCount: number;
	isPremium: boolean;
}

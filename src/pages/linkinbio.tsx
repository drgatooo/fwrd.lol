import type { GetServerSideProps } from 'next';
import type { LIBConfig } from '@/hooks/useLIBConfig';
import type { LIBLink } from '@/types';
import { Layout } from '@/components/layout';
import { LinkInBio } from '@/components/linkInBio';
import { getSession } from '@/utils/auth';
import palettes from '@/constants/palettes.json';
import prisma from '@/lib/prisma';

export default function LinkInBioPage({ config, links }: LIBProps) {
	return (
		<Layout
			metadata={{
				title: 'Link en bio',
				description: 'Crea un enlace corto para compartirlo con tus amigos.'
			}}
		>
			<h2 className={'mt-5'}>Enlace de perfil</h2>
			<LinkInBio initial={config} links={links} />
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
		select: { id: true, name: true, email: true }
	});

	if (!user) {
		return { redirect: { destination: '/' } };
	}

	const config =
		(await prisma.linkInBio.findFirst({
			where: { userId: user.id }
		})) ??
		(await prisma.linkInBio.create({
			data: {
				title: user.name,
				description: undefined,
				buttonRound: 'medium',
				buttonStyle: 'fill',
				palette: palettes.arch,
				userId: user.id,
				username: user.email.split('@')[0]
			}
		}));

	const links = await prisma.link.findMany({
		where: { creatorId: user.id, inBio: true },
		select: { alias: true, url: true, libLabel: true, asSocial: true, createdAt: true }
	});

	return {
		props: {
			config,
			links: JSON.parse(
				JSON.stringify(links.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()))
			)
		}
	};
}) as GetServerSideProps<LIBProps>;

interface LIBProps {
	config: LIBConfig;
	links: LIBLink[];
}

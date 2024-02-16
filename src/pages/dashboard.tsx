import type { GetServerSideProps } from 'next';
import { Layout } from '@/components/layout';
import type { Link } from '@prisma/client';
import { MyLinks } from '@/components/wizards';
import { RelatedLinks } from '@/components/utils';
import { getSession } from '@/utils/auth';
import prisma from '@/lib/prisma';

export default function Dashboard({ user }: DashboardProps) {
	return (
		<Layout
			metadata={{
				title: 'Mis enlaces',
				description: 'Gestiona tus enlaces.'
			}}
		>
			<h2 className={'mt-5'}>Mis enlaces</h2>
			<RelatedLinks />
			<MyLinks user={user} />
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
		select: {
			name: true,
			links: true,
			premium: true
		}
	});

	return {
		props: { user: JSON.parse(JSON.stringify(user)) }
	};
}) as GetServerSideProps<DashboardProps>;

export interface DashboardProps {
	user: {
		name: string;
		links: Link[];
		premium: boolean;
	};
}

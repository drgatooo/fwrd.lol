import { Hint, RelatedLinks } from '@/components/utils';
import { Dashboard } from '@/components/dashboard';
import type { GetServerSideProps } from 'next';
import { Layout } from '@/components/layout';
import type { Link } from '@prisma/client';
import { getSession } from '@/utils/auth';
import prisma from '@/lib/prisma';
import { useRouter } from 'next/router';

export default function DashboardPage({ user }: DashboardProps) {
	const router = useRouter();

	return (
		<Layout
			metadata={{
				title: 'Mis enlaces',
				description: 'Gestiona tus enlaces.'
			}}
		>
			<h2 className={'mt-5'}>Mis enlaces</h2>
			<RelatedLinks />
			{router.query.from_lib && <Hint>Edita un enlace para agregarlo a tu enlace de perfil.</Hint>}
			<Dashboard user={user} />
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

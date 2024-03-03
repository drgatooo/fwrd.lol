import { Hint, RelatedLinks } from '@/components/utils';
import { Dashboard } from '@/components/dashboard';
import { Layout } from '@/components/layout';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function DashboardPage() {
	useSession({ required: true });
	const router = useRouter();

	return (
		<Layout
			restricted
			metadata={{
				title: 'Mis enlaces',
				description: 'Gestiona tus enlaces.'
			}}
		>
			<h2 className={'mt-5'}>Mis enlaces</h2>
			<RelatedLinks />
			{router.query.from_lib && <Hint>Edita un enlace para agregarlo a tu enlace de perfil.</Hint>}
			<Dashboard />
		</Layout>
	);
}

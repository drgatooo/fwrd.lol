import { Layout } from '@/components/layout';
import { LinkInBio } from '@/components/linkInBio';

export default function LinkInBioPage() {
	return (
		<Layout
			metadata={{
				title: 'Link en bio',
				description: 'Crea un enlace corto para compartirlo con tus amigos.'
			}}
		>
			<h2 className={'mt-5'}>Enlace de perfil</h2>
			<LinkInBio />
		</Layout>
	);
}

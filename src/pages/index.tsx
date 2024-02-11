import { HeroContainer, HeroInteractive, HeroTitle } from '@/components/layout/hero';
import { Highlight } from '@/components/core';
import { Layout } from '@/components/layout';

export default function Home() {
	return (
		<Layout
			metadata={{
				title: 'Acorta tus enlaces',
				description: 'fwrd.lol es una herramienta para compartir enlaces rápidamente.'
			}}
		>
			<HeroContainer>
				<HeroTitle>
					Acorta, comparte, <span className={'magicHero'}>impacta</span>.
				</HeroTitle>
				<p className={'text-center'}>
					¿Cansado de los aburridos enlaces largos? Con fwrd.lol puedes{' '}
					<Highlight bg={'bg-emerald-500/20'}>acortar tus enlaces</Highlight>,{' '}
					<Highlight bg={'bg-indigo-500/20'}>crear códigos QR</Highlight> y tener un{' '}
					<Highlight bg={'bg-orange-500/20'}>enlace de perfil personalizado</Highlight>.
				</p>
				<HeroInteractive />
			</HeroContainer>
		</Layout>
	);
}

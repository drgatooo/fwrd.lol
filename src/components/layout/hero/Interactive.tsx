import { signIn, useSession } from 'next-auth/react';
import { Button } from '@/components/core';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { MdOutlineDashboard } from 'react-icons/md';
import { useBoolean } from '@/hooks';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function HeroInteractive() {
	const { status } = useSession();
	const [loading, { on, off }] = useBoolean(true);
	const router = useRouter();

	useEffect(() => {
		if (status == 'loading') on();
		else off();
	}, [status, on, off]);

	return (
		<div className={'flex w-full justify-center'}>
			<Button
				color={'default'}
				variant={'outline'}
				leftIcon={status !== 'authenticated' ? <GoogleIcon /> : <MdOutlineDashboard />}
				loading={loading}
				loadingMessage={'Cargando...'}
				onClick={() => {
					if (status !== 'authenticated') {
						on();
						void signIn('google');
					} else {
						void router.push('/dashboard');
					}
				}}
			>
				<span>{status !== 'authenticated' ? 'Accede con Google' : 'Ver mis enlaces'}</span>
			</Button>
		</div>
	);
}

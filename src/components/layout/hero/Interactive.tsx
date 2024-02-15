import { signIn, useSession } from 'next-auth/react';
import { Button } from '@/components/core';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { MdOutlineDashboard } from 'react-icons/md';
import { useBoolean } from '@/hooks';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function HeroInteractive() {
	const { status } = useSession();
	const [loading, { on, off }] = useBoolean(false);
	const router = useRouter();

	useEffect(() => {
		if (status == 'loading') on();
		else off();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status]);

	return (
		<div className={'flex w-full justify-center'}>
			{status !== 'authenticated' ? (
				<LoginButton loading={loading} on={on} />
			) : (
				<Button
					color={'default'}
					variant={'outline'}
					leftIcon={<MdOutlineDashboard />}
					onClick={() => {
						void router.push('/dashboard');
					}}
				>
					Ver mis enlaces
				</Button>
			)}
		</div>
	);
}

function LoginButton({ loading, on }: { loading: boolean; on: () => void }) {
	return (
		<Button
			color={'default'}
			variant={'outline'}
			leftIcon={<GoogleIcon />}
			loading={loading}
			loadingMessage={'Cargando...'}
			onClick={() => {
				on();
				void signIn('google');
			}}
		>
			<span>Accede con Google</span>
		</Button>
	);
}

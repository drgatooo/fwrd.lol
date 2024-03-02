import { Button } from '../core';
import { useRouter } from 'next/router';

export function UnableToCreateLink() {
	const router = useRouter();

	return (
		<div className={'flex h-[50svh] w-full flex-col items-center justify-center gap-5 text-center'}>
			<h3>Has alcanzado el límite</h3>
			<p className="text-pretty text-sm">
				Necesitas una cuenta premium para crear más de 30 enlaces.
				<br />
				Considera eliminar enlaces en desuso para obtener más espacios.
			</p>
			<Button onClick={() => router.push('/dashboard')}>Ver mis enlaces</Button>
		</div>
	);
}

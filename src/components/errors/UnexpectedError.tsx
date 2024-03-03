import { Button } from '../core';
import { useRouter } from 'next/router';

export function UnexpectedError({ error }: { error?: Error }) {
	const router = useRouter();

	return (
		<div className={'flex h-[50svh] w-full flex-col items-center justify-center gap-5 text-center'}>
			<h3>:(</h3>
			<p className="text-pretty text-sm">
				Ha ocurrido un error inesperado. Prueba recargando la página.
				{error && <br />}
				{error && <span className="text-pretty text-xs">{error.message}</span>}
			</p>
			<Button onClick={() => router.push('/')}>Un lugar seguro...</Button>
		</div>
	);
}

import { Button, Input, Spinner, Textarea } from '@/components/core';
import { Layout } from '@/components/layout';
import { MdDownload } from 'react-icons/md';
import { RelatedLinks } from '@/components/utils';
import { useCanvas } from '@/hooks';
import { useDebounce } from '@/hooks/useDebounce';
import { useRouter } from 'next/router';

export default function CreateQRPage() {
	const router = useRouter();
	const { input } = router.query;

	const [text, actualText, setText, inTextDelay] = useDebounce(input?.toString() ?? '', 3000);
	const [light, actualLight, setLight, inLightDelay] = useDebounce('#ffffff', 3000);
	const [dark, actualDark, setDark, inDarkDelay] = useDebounce('#000000', 3000);

	const inDelay = inTextDelay || inLightDelay || inDarkDelay;

	useCanvas('qrcode', { text, dark, light });

	const downloadCanvas = () => {
		const canvas = document.getElementById('qrcode') as HTMLCanvasElement;
		const link = document.createElement('a');
		link.download = 'qrcode.png';
		link.href = canvas.toDataURL('image/png');
		link.click();
	};

	return (
		<Layout
			metadata={{
				title: 'Crear QR',
				description: 'Crea tu código QR personalizado.'
			}}
		>
			<h2 className={'mt-5'}>Crear QR</h2>
			<RelatedLinks />
			<div className={'grid justify-items-center gap-x-5 gap-y-8 md:grid-cols-2'}>
				<div id={'nomelacontainer'}>
					<div className="relative">
						<div
							className={`absolute overflow-hidden rounded-xl ${inDelay || !actualText.length ? 'flex' : 'hidden'} top-0 z-50 h-full w-full items-center justify-center bg-black/70`}
						>
							<Spinner size={'lg'} />
						</div>
						<canvas id={'qrcode'} className={'!h-max !w-full max-w-64 rounded-xl'} />
					</div>
				</div>

				<div className={'flex w-full flex-col gap-5'}>
					<Textarea
						name={'text'}
						label={'Introduce el texto'}
						value={actualText}
						onChange={e => setText(e.target.value)}
						required
					/>
					<div className={'grid grid-cols-2 gap-5'}>
						<Input
							name={'light'}
							label={'Fondo'}
							value={actualLight}
							onChange={e => setLight(e.target.value)}
							type={'color'}
							className={'h-16 w-full'}
						/>
						<Input
							name={'dark'}
							label={'Primer plano'}
							value={actualDark}
							onChange={e => setDark(e.target.value)}
							type={'color'}
							className={'h-16 w-full'}
						/>
					</div>

					<span className={'text-sm text-zinc-600 dark:text-zinc-400'}>
						* Las imágenes generadas no se almacenan en el servidor.
					</span>

					<Button
						leftIcon={<MdDownload />}
						loading={inDelay || !actualText.length}
						onClick={downloadCanvas}
					>
						Descargar
					</Button>
				</div>
			</div>
		</Layout>
	);
}

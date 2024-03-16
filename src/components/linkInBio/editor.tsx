import { Button, Input, Textarea } from '@/components/core';
import type { LIBConfig, Palette, SetLIBConfig } from '@/hooks/useLIBConfig';
import { EditorSection } from './utils/EditorSection';
import { Hint } from '@/components/utils';
import Link from 'next/link';
import { convertToValidUsername } from '@/utils/validators';
import palettes from '@/constants/palettes.json';
import toast from 'react-hot-toast';
import { useState } from 'react';

interface LIBEditorProps {
	data: LIBConfig;
	set: SetLIBConfig;
	submit: () => void;
	submitting: boolean;
	hasChanges: boolean;
}

export function LIBEditor({ data, set, submit, submitting, hasChanges }: LIBEditorProps) {
	const [fileName, setFileName] = useState<string>('');

	const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (e.target.files?.length && e.target.value.length) {
			console.log('holi');
			setFileName(e.target.value);

			if (e.target.files[0].size >= 2 * 1024 * 1024) {
				return toast.error('La imagen no puede pesar más de 2MB');
			}

			const fileReader = new FileReader();
			fileReader.readAsDataURL(e.target.files[0]);

			fileReader.onload = () => {
				set('image', fileReader.result?.toString() ?? '');
			};

			fileReader.onerror = () => {
				toast.error('Ocurrió un error al cargar la imagen');
			};

			return void 0;
		} else {
			return toast('Se canceló la selección de la imagen');
		}
	};

	return (
		<div className={'flex flex-col gap-5'}>
			<Hint>
				Agrega enlaces en tu <Link href={'/dashboard?from_lib=true'}>/dashboard</Link>
			</Hint>

			<Input
				label={'Nombre de usuario'}
				name={'username'}
				value={data.username}
				onChange={e => set('username', convertToValidUsername(e.target.value))}
				message={`Tu enlace será: fwrd.lol/@${data.username}`}
			/>

			<EditorSection label={'Información'}>
				<Input
					label={`Título (${data.title.length}/30)`}
					name={'title'}
					value={data.title}
					onChange={e => set('title', e.target.value)}
					maxLength={30}
				/>
				<Textarea
					label={`Descripción (${data.description.length}/100)`}
					name={'description'}
					value={data.description}
					onChange={e => set('description', e.target.value)}
					maxLength={100}
				/>
				<Input
					label={`Footer (${data.footer.length}/30)`}
					name={'footer'}
					value={data.footer}
					onChange={e => set('footer', e.target.value)}
					maxLength={30}
				/>

				<div className="flex gap-3">
					<Input
						label={'Imagen (2 MB)'}
						name={'image'}
						type={'file'}
						accept={'image/png, image/jpeg, image/webp, image/gif'}
						onChange={handleUpload}
						value={fileName}
					/>
					<Button
						disabled={!data.image.length}
						onClick={() => {
							set('image', '');
							setFileName('');
						}}
					>
						Quitar
					</Button>
				</div>

				<p className={'text-sm'}>* Las imágenes se almacenan en imgbb.com</p>
			</EditorSection>
			<hr />
			<EditorSection
				label={
					<>
						Temas <span className={'text-zinc-500'}>- de MonkeyType</span>
					</>
				}
			>
				<div className={'grid gap-5 sm:grid-cols-2'}>
					{Object.entries(palettes).map(([name, colors]) => (
						<div
							key={name}
							className={`cursor-pointer rounded-2xl border-2 p-2 transition duration-100 ${
								data.palette == colors
									? 'border-rose-500'
									: 'border-transparent hover:border-zinc-500'
							}`}
							onClick={() => set('palette', colors as Palette)}
						>
							<div className={'flex w-full overflow-hidden rounded-xl'}>
								{colors.map((color, i) => (
									<div key={i} className={'h-14 w-1/5'} style={{ backgroundColor: color }} />
								))}
							</div>
							<span>{name}</span>
						</div>
					))}
				</div>
			</EditorSection>
			<hr />
			<EditorSection label={'Botones'}>
				<div className="flex flex-col gap-4">
					<h5 className={'px-4'}>Estilo</h5>
					<div className={'grid gap-3 p-3 sm:grid-cols-3'} style={{ background: 'var(--c3)' }}>
						<button
							data-round={data.buttonRound}
							data-var={'fill'}
							onClick={() => set('buttonStyle', 'fill')}
						>
							{data.buttonStyle == 'fill' && '✓'} Relleno
						</button>
						<button
							data-round={data.buttonRound}
							data-var={'outline'}
							onClick={() => set('buttonStyle', 'outline')}
						>
							{data.buttonStyle == 'outline' && '✓'} Borde
						</button>
						<button
							data-round={data.buttonRound}
							data-var={'hardshadow'}
							onClick={() => set('buttonStyle', 'hardshadow')}
						>
							{data.buttonStyle == 'hardshadow' && '✓'} Sombra
						</button>
					</div>
					<h5 className={'px-4'}>Borde</h5>
					<div className={'grid gap-3 p-3 sm:grid-cols-3'} style={{ background: 'var(--c3)' }}>
						<button
							data-round={'none'}
							data-var={data.buttonStyle}
							onClick={() => set('buttonRound', 'none')}
						>
							{data.buttonRound == 'none' && '✓'} Sin redondear
						</button>
						<button
							data-round={'medium'}
							data-var={data.buttonStyle}
							onClick={() => set('buttonRound', 'medium')}
						>
							{data.buttonRound == 'medium' && '✓'} Medio
						</button>
						<button
							data-round={'full'}
							data-var={data.buttonStyle}
							onClick={() => set('buttonRound', 'full')}
						>
							{data.buttonRound == 'full' && '✓'} Completo
						</button>
					</div>
				</div>
			</EditorSection>

			<div className={'flex justify-end'}>
				<Button onClick={submit} loading={submitting} disabled={!hasChanges}>
					Editar
				</Button>
			</div>
		</div>
	);
}

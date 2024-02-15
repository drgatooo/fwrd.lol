import { Button, Input, Textarea } from '../core';
import { MdLock, MdRocketLaunch } from 'react-icons/md';
import { isValidAlias, isValidURL } from '@/utils/validators';
import { useCreateLinkForm } from '@/hooks';

interface ShortenerWizardProps {
	linkCount: number;
	isPremium: boolean;
}

export function Shortener({ linkCount, isPremium }: ShortenerWizardProps) {
	const { customAlias, description, longUrl, set, submit, submitting } = useCreateLinkForm();
	const isInvalidURL = !!longUrl.length && !isValidURL(longUrl);
	const isInvalidAlias = !!customAlias.length && !isValidAlias(customAlias);

	return (
		<div className={'flex flex-col gap-5'}>
			<div>
				<Input
					value={longUrl}
					onChange={e => set('url', e.target.value)}
					label={'Ingrese el enlace de destino'}
					required
					type={'url'}
					name={'url'}
					invalid={isInvalidURL}
					message={
						isInvalidURL
							? 'El enlace es inválido.'
							: `Puedes crear ${isPremium ? 'enlaces ilimitados.' : `${20 - linkCount} enlaces más.`}`
					}
				/>
			</div>
			<Textarea
				value={description}
				onChange={e => set('description', e.target.value)}
				label={`Descripción (${description.length}/250)`}
				name={'description'}
				maxLength={250}
				containerClassName={'mb-1.5'}
			/>
			<div className={'grid gap-5 md:grid-cols-2'}>
				<Input
					defaultValue={'fwrd.lol/'}
					disabled
					label={'Dominio (próximamente)'}
					required
					name={'url'}
					rightIcon={<MdLock />}
				/>
				<Input
					value={customAlias}
					onChange={e => set('alias', e.target.value)}
					label={'Alias personalizado'}
					required
					name={'alias'}
					invalid={isInvalidAlias}
					message={isInvalidAlias ? 'El alias es inválido.' : ''}
				/>
			</div>
			<div className={'flex w-full'}>
				<Button
					loading={submitting}
					leftIcon={<MdRocketLaunch />}
					color={'emerald'}
					onClick={submit}
					disabled={
						isInvalidURL || isInvalidAlias || submitting || !longUrl.length || !customAlias.length
					}
				>
					Acortar
				</Button>
			</div>
		</div>
	);
}

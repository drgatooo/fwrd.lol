import { Button, Input, Switch, Textarea } from '../core';
import { MdDelete, MdEdit } from 'react-icons/md';
import type { Link } from '@prisma/client';
import { isValidURL } from '@/utils/validators';
import { useEditLinkForm } from '@/hooks';

interface LinkEditorProps {
	link: Link;
}

export function LinkEditor({ link }: LinkEditorProps) {
	const { longUrl, description, inBio, asSocial, libLabel, set, submit, submitting, deleteLink } =
		useEditLinkForm(link.alias, {
			url: link.url,
			description: link.description,
			asSocial: link.asSocial,
			inBio: link.inBio,
			libLabel: link.libLabel
		});
	const isInvalidURL = !!longUrl.length && !isValidURL(longUrl);

	return (
		<>
			<Input
				value={longUrl}
				onChange={e => set('url', e.target.value)}
				label={'Nuevo enlace'}
				required
				type={'url'}
				name={'url'}
				invalid={isInvalidURL}
				message={isInvalidURL ? 'El enlace es inválido.' : undefined}
			/>

			<Textarea
				value={description}
				onChange={e => set('description', e.target.value)}
				label={`Descripción (${description.length}/250)`}
				name={'description'}
				maxLength={250}
				containerClassName={'mb-1.5'}
			/>

			<Switch
				checked={inBio}
				onChange={() => set('inBio', '')}
				label={'Agregar a mi enlace de perfil'}
			/>

			{inBio && (
				<div className={'flex flex-col gap-3 sm:flex-row'}>
					<Input
						value={libLabel}
						onChange={e => set('libLabel', e.target.value)}
						label={'Etiqueta'}
						name={'libLabel'}
						maxLength={30}
						required
					/>
					<Switch
						checked={asSocial}
						onChange={() => set('asSocial', '')}
						label={'Es enlace social'}
					/>
				</div>
			)}

			<div className={'flex gap-3'}>
				<Button
					loading={submitting}
					leftIcon={<MdEdit />}
					onClick={submit}
					disabled={
						isInvalidURL ||
						submitting ||
						!longUrl.length ||
						(longUrl == link.url &&
							description == link.description &&
							inBio &&
							inBio == link.inBio &&
							libLabel == link.libLabel &&
							asSocial == link.asSocial)
					}
				>
					Editar
				</Button>
				<Button
					loading={submitting}
					leftIcon={<MdDelete />}
					color={'rose'}
					onClick={deleteLink}
					disabled={submitting}
				>
					Eliminar
				</Button>
			</div>
		</>
	);
}

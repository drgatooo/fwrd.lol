import { Button, Input, Switch, Textarea } from '../core';
import { MdDelete, MdEdit } from 'react-icons/md';
import type { Link } from '@prisma/client';
import { isValidURL } from '@/utils/validators';
import { useEditLinkForm } from '@/hooks';

interface LinkEditorProps {
	link: Link;
}

export function LinkEditor({ link: data }: LinkEditorProps) {
	const { set, submit, submitting, deleteLink, ...link } = useEditLinkForm(data.alias, data);
	const isInvalidURL = !!link.longUrl.length && !isValidURL(link.longUrl);

	return (
		<>
			<Input
				value={link.longUrl}
				onChange={e => set('url', e.target.value)}
				label={'Nuevo enlace'}
				required
				type={'url'}
				name={'url'}
				invalid={isInvalidURL}
				message={isInvalidURL ? 'El enlace es inválido.' : undefined}
			/>

			<Textarea
				value={link.description}
				onChange={e => set('description', e.target.value)}
				label={`Descripción (${link.description.length}/250)`}
				name={'description'}
				maxLength={250}
				containerClassName={'mb-1.5'}
			/>

			<Switch
				checked={link.inBio}
				onChange={() => set('inBio', '')}
				label={'Agregar a mi enlace de perfil'}
			/>

			{link.inBio && (
				<div className={'flex flex-col gap-3 sm:flex-row'}>
					<Input
						value={link.libLabel}
						onChange={e => set('libLabel', e.target.value)}
						label={'Etiqueta'}
						name={'libLabel'}
						maxLength={30}
						required
					/>
					<Switch
						checked={link.asSocial}
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
						!link.longUrl.length ||
						(link.longUrl == data.url &&
							link.description == data.description &&
							link.inBio &&
							link.inBio == data.inBio &&
							link.libLabel == data.libLabel &&
							link.asSocial == data.asSocial)
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

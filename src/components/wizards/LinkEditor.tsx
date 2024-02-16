import { Button, Input, Textarea } from '../core';
import { MdDelete, MdEdit } from 'react-icons/md';
import type { Link } from '@prisma/client';
import { isValidURL } from '@/utils/validators';
import { useEditLinkForm } from '@/hooks';

interface LinkEditorProps {
	link: Link;
}

export function LinkEditor({ link }: LinkEditorProps) {
	const { longUrl, description, set, submit, submitting, deleteLink } = useEditLinkForm(
		link.alias,
		{
			url: link.url,
			description: link.description
		}
	);
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

			<div className={'flex gap-3'}>
				<Button
					loading={submitting}
					leftIcon={<MdEdit />}
					color={'yellow'}
					onClick={submit}
					disabled={
						isInvalidURL ||
						submitting ||
						!longUrl.length ||
						(longUrl == link.url && description == link.description)
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
